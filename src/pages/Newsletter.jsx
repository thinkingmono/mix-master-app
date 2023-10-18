import { Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";
const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

/*Action creation to handle form submision with react router*/
export const action = async ({ request }) => {
  const formData = await request.formData(); /*Get formData Object*/
  const data = Object.fromEntries(formData); /*Get info from inputs*/
  try {
    const response = await axios.post(newsletterUrl, data); /*Submit info to preconfigure server*/
    toast.success(response.data.msg);
    return redirect('/'); /*Redirect to home when finish submit*/
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);/*Shows error when form inputs are not filled*/
    return error;
  }

}

const Newsletter = () => {
  const navigation = useNavigation();
  // console.log(navigation);
  const isSubmiting = navigation.state === 'submitting'; /*UseNavigation hook brings state submitting when form submits. Used to change btn text and disable it when submitting*/
  return (
    <Form className="form" method="POST">
      <h4 style={{ textAlign: "center", marginBottom: '2rem' }}>Our Newsletter</h4>
      <div className="form-row">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" name="name" id="name" defaultValue='Alejandro' className="form-input" required />
      </div>
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input type="text" name="lastName" id="lastName" defaultValue='Garcia' className="form-input" required />
      </div>
      <div className="form-row">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" name="email" id="email" defaultValue='test@test.com' className="form-input" required />
      </div>
      <button type="submit" className="btn btn-block" style={{ marginTop: '0.5rem' }} disabled={isSubmiting}>{isSubmiting ? 'Submitting' : 'Submit'}</button>
    </Form>
  )
}

export default Newsletter