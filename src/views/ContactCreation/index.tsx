import React, { useCallback, useMemo } from 'react';
import { Formik, FormikErrors, useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { SearchableDropdown, Footer, TextField, PageReturnHeader } from 'front-plugin-components-library';
import { useAppDispatch } from '../../app/hooks';
import { SearchableDropdownItem } from '../../types/SearchableDropdownItem';
import { CompanyFull } from '../../interfaces/Company';
import { ContactFull } from "../../interfaces/Contact";
import { ROLE_OPTIONS } from '../../consts/roles';
import { createContact } from '../../utils/airtableUtils';
import 'react-toastify/dist/ReactToastify.css';

import './styles.scss';

// tslint:disable-next-line
export interface ContactCreationProps {
	companies: CompanyFull[];
	onContactCreate: (contacts: ContactFull[]) => void;
}

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
		errors.name = 'The Item Name is required!';
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

const ContactCreation: React.FC<ContactCreationProps> = ({ companies, onContactCreate }) => {
	const { goBack } = useHistory();
	const dispatch = useAppDispatch();

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
		const createdContacts = await createContact(dataToPass);
		onContactCreate(createdContacts);

		toast.success('Contact created!', {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 5000
		});
	},[dispatch, goBack]);

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
				}) => (<>
					<div className="contact-creation-body">
						<PageReturnHeader label="Create new" onReturnClick={goBack} className="contact-creation-prh" />
						<h2 className="contact-creation-title">Create new contact</h2>
						<div className="contact-field-wrapper">
							<TextField
								isRequired={true}
								label="Name"
								value={values.name}
								placeholder="Create contact name"
								onChange={(name: string) => setFieldValue('name', name)}
							/>
						</div>
						<div className="contact-field-wrapper">
							<TextField
								label="Email"
								value={values.email}
								placeholder="Create contact email"
								onChange={(name: string) => setFieldValue('email', name)}
							/>
						</div>
						<div className="contact-field-wrapper">
							<TextField
								label="Phone"
								value={values.phone}
								placeholder="Create contact phone"
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
	const companyOptions = useMemo(() => {
		return companies.map(company => ({key: company.id, label: company.fields.Company}))
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
