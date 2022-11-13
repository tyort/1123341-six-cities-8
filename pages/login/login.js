import Link from 'next/link';
import { createRef } from 'react';
import Header from '../../components/Header';

function LoginScreen() {
  const formRef = createRef(); // связываем JSX DOM-элементом;

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    // FormData - получить данные из формы;
    // formRef.current - DOM-элемент;
    // ... .get('name у Input')
    console.log(`Данные формы`, new FormData(formRef.current).get(`email`));
  };

  return (
    <div className='page page--gray page--login'>
      <Header />

      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <form
              ref={formRef}
              className='login__form form'
              action='#'
              method='post'
              onSubmit={handleFormSubmit}
            >
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>E-mail</label>
                <input
                  className='login__input form__input'
                  type='email'
                  name='email'
                  placeholder='Email'
                  required=''
                  defaultValue='вставляй данные не пользовательский через интерфейс'
                />
              </div>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>Password</label>
                <input
                  className='login__input form__input'
                  type='password'
                  name='password'
                  placeholder='Password'
                  required=''
                  defaultValue='вставляй данные не пользовательский через интерфейс'
                />
              </div>
              <button
                className='login__submit form__submit button'
                type='submit'
              >
                Sign in
              </button>
            </form>
          </section>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <Link href='#' className='locations__item-link'>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
