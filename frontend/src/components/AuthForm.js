import { Form, useActionData, useNavigation } from 'react-router-dom';
import { useSearchParams, Link } from 'react-router-dom';
import { firstLetterToUppercase } from '../utils/helpers';
import classes from './AuthForm.module.css';

function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const actionData = useActionData();
  const navigation = useNavigation();
  const status = navigation.state;

  let errors = [];
  if (actionData && actionData.errors) {
    errors = Object.values(actionData.errors);
  }
  console.log(actionData);
  const authMode = searchParams.get('mode');
  let switchMode;

  if (authMode === 'login') {
    switchMode = 'register';
  } else {
    switchMode = 'login';
  }

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{firstLetterToUppercase(authMode)}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {authMode === 'register' && (
          <p>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
              required
            />
          </p>
        )}
        <ul className={classes.errors}>
          {errors.length > 0 &&
            errors.map((err, idx) => <li key={idx}>{err}</li>)}
        </ul>
        <div className={classes.actions}>
          <button disabled={status === 'submitting'}>
            {status === 'submitting'
              ? 'Submitting...'
              : firstLetterToUppercase(authMode)}
          </button>
        </div>
        <div className={classes.link}>
          <Link to={`?mode=${switchMode}`}>
            {`${
              authMode === 'login' ? 'New' : 'Existing'
            } user? ${firstLetterToUppercase(switchMode)} here`}
          </Link>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
