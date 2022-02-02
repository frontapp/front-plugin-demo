import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { Formik, FormikErrors, useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { SearchableDropdown, Footer, TextField, PageReturnHeader, SearchableDropdownItem } from '@frontapp/plugin-components';
import { useAppSelector } from '../../app/hooks';
import { CompanyFull } from '../../interfaces/Company';
import { ContactFull } from '../../interfaces/Contact';
import { ROLE_OPTIONS } from '../../consts/roles';
import { createContact, getCompaniesList } from '../../utils/airtableUtils';
import { frontContextSelector } from '../../app/frontContextSlice';
import 'react-toastify/dist/ReactToastify.css';

import './styles.scss';

// tslint:disable-next-line
export interface ContactCreationProps {}

// Shape of form values
interface FormValues {
	name?: string;
	email?: string;
	phone?: string;
	company: SearchableDropdownItem | null;
	role?: SearchableDropdownItem | null;
}

const formValidation = (values: FormValues) => {
	const errors: FormikErrors<FormValues> = {};

	if (!values.name?.length) {
		errors.name = 'The Contact Name is required.';
	}

	if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email as string)) {
		errors.email = 'Please enter a valid email.';
	}

	if (!values.email?.length) {
		errors.email = 'The Email is required.';
	}

	return errors;
};

const initialValues: FormValues = {
	name: '',
	email: '',
	phone: '',
	company: null,
	role: null,
};

const ContactCreation: React.FC<ContactCreationProps> = () => {
	const { goBack } = useHistory();
	const frontContext = useAppSelector(frontContextSelector);
	const [companies, setCompanies] = useState<CompanyFull[]>([]);

	useEffect(() => {
		// Example of requests. Will be removed after further improvements
		const getCompanies = async () => {
			const companies = await getCompaniesList(frontContext);
			setCompanies(companies);
		}

		frontContext && getCompanies();
	}, [frontContext]);

	const onSubmit = useCallback(async (values) => {
		const dataToPass: ContactFull[] = [{
			fields: {
				"Full Name": values.name,
				"Email": values.email,
				"Phone": values.phone
			}
		}];
		if (values.company?.key) {
			dataToPass[0].fields.Company = [values.company?.key];
		}
		if (values.role?.key) {
			dataToPass[0].fields.Role = [values.role?.key];
		}
		await createContact(frontContext, dataToPass);

		toast.success('Contact created!', {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 3000,
			onClose: () => {
				goBack();
			},
		});
	},[frontContext, goBack]);

	return (
		<div className="contact-creation-wrapper">
			<Formik
				initialValues={initialValues}
				validate={formValidation}
				onSubmit={onSubmit}
			>
				{({
					values,
					handleSubmit,
					isValid,
					dirty,
					setFieldValue,
					setTouched,
					errors,
					touched,
				}) => (<>
					<div className="contact-creation-body">
						<PageReturnHeader label="Create new" onReturnClick={goBack} className="contact-creation-prh" />
						<h2 className="contact-creation-title">Create new contact</h2>
						<div className="contact-field-wrapper">
							<TextField
								isRequired={true}
								label="Name"
								value={values.name}
								placeholder="Contact name"
								onChange={(name: string) => setFieldValue('name', name)}
								onBlur={() => setTouched({ ...touched, name: true }, true)}
								errorText={errors.name && touched.name ? errors.name : ''}
							/>
						</div>
						<div className="contact-field-wrapper">
							<TextField
								isRequired={true}
								label="Email"
								value={values.email}
								placeholder="Contact email"
								onChange={(name: string) => setFieldValue('email', name)}
								onBlur={() => setTouched({ ...touched, email: true }, true)}
								errorText={errors.email && touched.email ? errors.email : ''}
							/>
						</div>
						<div className="contact-field-wrapper">
							<TextField
								label="Phone"
								value={values.phone}
								placeholder="Contact phone"
								onChange={(name: string) => setFieldValue('phone', name)}
							/>
						</div>
						<ItemCompany companies={companies} />
						<ItemRole />
					</div>
					<Footer
						isPrimaryDisabled={!isValid || !dirty}
						primaryLabel="Create"
						onPrimaryClick={handleSubmit}
						secondaryLabel="Cancel"
						onSecondaryClick={goBack}
					/>
				</>)}
			</Formik>
			<ToastContainer />
		</div>
	);
};

interface ItemCompanyProps {
	companies: CompanyFull[];
}

const ItemCompany: React.FC<ItemCompanyProps> = ({ companies }) => {
	// const dispatch = useAppDispatch();
	const { values, setFieldValue } = useFormikContext<FormValues>();
	// TODO: get from store all companies (useAppSelector(companiesSelector);)
	// useMemo - temporary
	const companyOptions: SearchableDropdownItem[] = useMemo(() => {
		return companies.map(company => ({key: company.id as string, label: company.fields.Company as string}))
	}, [companies]);

	const handleSelectCompany = (value: SearchableDropdownItem) => {
		setFieldValue('company', value);
	};

	return <div className="contact-company-wrapper">
		<SearchableDropdown
			onSelectValue={handleSelectCompany}
			title="Company"
			placeholder="Select company"
			options={companyOptions}
			value={values.company}
		/>
	</div>;
};

const ItemRole = () => {
	// const dispatch = useAppDispatch();
	const { values, setFieldValue } = useFormikContext<FormValues>();
	const roleOptions = useMemo(() => {
		return ROLE_OPTIONS.map(role => ({key: role, label: role}))
	}, []);

	const handleSelectRole = (value: SearchableDropdownItem) => {
		setFieldValue('role', value);
	};

	return <div className="contact-role-wrapper">
		<SearchableDropdown
			onSelectValue={handleSelectRole}
			title="Role"
			placeholder="Select role"
			options={roleOptions}
			value={values.role}
		/>
	</div>;
};

export default ContactCreation;
