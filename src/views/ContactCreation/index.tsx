import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Formik, FormikErrors, useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import { SearchableDropdown, Footer, TextField, PageReturnHeader, Info } from 'front-plugin-components-library';
import { useAppDispatch } from '../../app/hooks';
import { createContact } from '../../app/contactsSlice';
import { SearchableDropdownItem } from '../../types/SearchableDropdownItem';
import { Company } from '../../interfaces/Company';
import { Role } from '../../interfaces/Role';

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
	attached: boolean;
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
	attached: true,
};

const ContactCreation: React.FC<ContactCreationProps> = () => {
	const { goBack } = useHistory();
	const dispatch = useAppDispatch();

	const onSubmit = useCallback(async (values) => {
		console.log('values', values);
		dispatch(createContact());
		// TODO: Show success Alert
		// return to the prev route
		goBack();
	},[dispatch, goBack]);

	return <div className="contact-creation-wrapper">
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
							onChange={(name: string) => setFieldValue('name', name)}
						/>
					</div>
					<div className="contact-field-wrapper">
						<TextField
							label="Phone"
							value={values.phone}
							placeholder="Create contact phone"
							onChange={(name: string) => setFieldValue('name', name)}
						/>
					</div>
					<ItemCompany />
					<ItemRole />
					<div className="contact-attached-wrapper">
						<span className="attached-title" onClick={() => setFieldValue('attached', !values.attached)}>
							<input type="checkbox" id="attached" checked={values.attached}  />
							<label htmlFor="attached">Attach to current conversation</label>
						</span>
						<Info
							content="Select this to automatically attach the contact to the conversation after creation."
							position="bottom-right-border"
							width="224px"
							className="contact-info-block"
						/>
					</div>
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
	</div>;
};

const ItemCompany = () => {
	// const dispatch = useAppDispatch();
	const { values, setFieldValue } = useFormikContext<FormValues>();
	// TODO: get from store all companies (useAppSelector(companiesSelector);)
	// useMemo - temporary
	const companies: Company[] = useMemo(() => [], []);
	const [companyOptions, setCompanyOptions] = useState<SearchableDropdownItem[]>([]);

	useEffect(() => {
		const companyOptions: SearchableDropdownItem[] = companies.map((company) => ({ key: company['Contract Value'], label: company['Company'] }));
		setCompanyOptions(companyOptions);
	}, [companies]);

	// TODO: fetch list of Companies
	/*useEffect(() => {
		dispatch(fetchCompanies());
	}, []);*/

	const handleSelectWorkspace = (value: SearchableDropdownItem) => {
		setFieldValue('company', value);
	};

	return <div className="contact-company-wrapper">
		<SearchableDropdown
			onSelectValue={handleSelectWorkspace}
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
	// TODO: get from store all companies (useAppSelector(rolesSelector);)
	// useMemo - temporary
	const roles: Role[] = useMemo(() => [], []);
	const [roleOptions, setRoleOptions] = useState<SearchableDropdownItem[]>([]);

	useEffect(() => {
		const companyOptions: SearchableDropdownItem[] = roles.map((role) => ({ key: role.id as number || 'null', label: role.name as string }));
		setRoleOptions(companyOptions);
	}, [roles]);

	// TODO: fetch list of Roles
	/*useEffect(() => {
		// dispatch(fetchRoles());
	}, []);*/

	const handleSelectWorkspace = (value: SearchableDropdownItem) => {
		setFieldValue('role', value);
	};

	return <div className="contact-role-wrapper">
		<SearchableDropdown
			onSelectValue={handleSelectWorkspace}
			title="Role"
			placeholder="Select role"
			options={roleOptions}
			value={values.role}
		/>
	</div>;
};

export default ContactCreation;
