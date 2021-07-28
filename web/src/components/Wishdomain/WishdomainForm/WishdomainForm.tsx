import { Form, FormError, FieldError, Label, TextField, Submit } from "@redwoodjs/forms";

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, "");
  }
};

const WishdomainForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.wishdomain?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label name="domain" className="rw-label" errorClassName="rw-label rw-label-error">
          Domain
        </Label>
        <TextField
          name="domain"
          defaultValue={props.wishdomain?.domain}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="domain" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default WishdomainForm;
