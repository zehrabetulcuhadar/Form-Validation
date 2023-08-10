import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup'; // yıldız her şeyi al anlamında
import './App.css';


const App = () => {
  return (
    <div className='container'>
      <div className='brand-box'>
        <h1>Form</h1>
      </div>

      <div className='sign-form'>
        {/* 
          formik etiketini formun yönetimini sağlamak için kullanıyoruz
          initialValues validationSchema onSubmit propları
          initialValues formdaki alanların başlangıç değerlerini içerir
          validationSchema Yup nesnesi. Her alan için doğrulama kurallarını belirtir
          onSubmit form gönderildiğinde gerçekleşecek işlem. form verileri values nesnesi içinde ve consola yazdırılır
          setSubmitting(false) ile formun gönderim durumu sıfırlanır
          resetForm() ile form alanları temizlenir
        */}
        <Formik
          initialValues={{ 
            name: '',
            surname: '',
            tc: '',
            email: '',
            agree: false,
            city: '',
          }}
          validationSchema={
            Yup.object({
              name: Yup.string().required('İsim boş bırakılamaz !'), 
              surname: Yup.string().required('Soyad boş bırakılamaz !'),
              tc: Yup.string().length(11, 'TC kimlik numarası 11 haneli olmalıdır !') 
                .required('TC kimlik numarası boş bırakılamaz !')
                .matches(/^[0-9]+$/, 'TC kimlik numarası sadece rakamlardan oluşmalıdır !'), 
              email: Yup.string().email().required('Email boş bırakılamaz !'), 
              agree: Yup.bool().oneOf([true], 'Koşulları kabul etmelisiniz !'),
              city: Yup.string()
                .required('Nerede yaşadığınızı belirtmelisiniz !')
                .oneOf(['İstanbul', 'Sakarya', 'Kocaeli', 'Ankara']), 
          })}
          // form gönderildiğinde çalışacak işlemler
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values); // formun değerlerini consola yazdırma
            setTimeout(() => {
              setSubmitting(false); // form tekrardan aktif hale gelsin diye değerini değiştirdik
              resetForm(); // formdaki tüm alanları sıfırlamak için
            }, 2000); // form gönderildikten sonra iki saniye beklesin hemen tekarar aktif olmasın
          }}
        >
          {/* 
            aşağıdaki fonksiyon gelen props değerlerini kullanır
            Formik bileşeni bu fonksiyonu çağırır props değerlerini içeren nesne geçirir ve
            bu sayde formun yönetimi sağlanmış olur

            touched formun alanlarına dokunulmuş mu
            dirty kullanıcı form alanlarına herhangi bir değer girdiğini veya değiştirdiğini
            gösteren boolean değeri. Eğer bir değer girmiş ya da değişmişse true
            isSubmitting formun gönderim işleminin devam edip etmediğini gösterir boolean.
            Eğer form gönderiliyorsa ture
            handleSubmit formun gönderilmesi durumunda çağıralcak işlem formu göndermek için bu fonksiyon kullanılmalı
            handleReset formun sıfırlanması durumunda çağıralcak işlem
            handleChange form alanlarında herhangi bir değişiklik olduğunda çağırılacak işlem

            handleChange onChange olayı ile bağlanır form alanlarındaki değişiklikler otomatik
            olarak yönetilmiş olur ve values nesnesine atanır

            htmlFor ile labellar input alanlarına bağlanır onChange ile değişiklikler yönetilir
            errors nesnesi, touched nesnesi ile birlikte kullanılarak form alanlarındaki doğrulama hataları görsel olarak gösterilir
            Eğer errors.name değeri varsa ve touched.name değeri true ise, <div className="input-feedback">{errors.name}</div> ifadesi 
            ile bu hata görsel olarak kullanıcıya gösterilir.
          */}
          {({
            values, touched, errors, dirty,
            isSubmitting, handleSubmit,
            handleReset, handleChange,
          }) => (
            <form className="sign-form" onSubmit={handleSubmit}>
              <label htmlFor="name">İsim</label>
              <input
                id="name"
                type="text"
                placeholder="İsminiz..."
                className="input"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && touched.name && (
                <div className="input-feedback">{errors.name}</div>
              )}

              <label htmlFor="surname">Soyadı</label>
              <input
                id="surname"
                type="text"
                placeholder="Soyadınız.."
                className="input"
                value={values.surname}
                onChange={handleChange}
              />
              {errors.surname && touched.surname && (
                <div className="input-feedback">{errors.surname}</div>
              )}

              <label htmlFor="tc">
                TC Kimlik
              </label>
              <input
                type="text"
                id="tc"
                className="input"
                placeholder="TC Kimlik..."
                onChange={handleChange}
                value={values.tc}
              />
              {touched.tc && errors.tc ? (<div className="input-feedback">{errors.tc}</div>) : null}

              <label htmlFor="email" className="topMargin">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="ornek@gmail.com"
                className="input"
                value={values.email}
                onChange={handleChange}
              />

              <label htmlFor="city" className="topMargin">
                Şehir
              </label>
              <select
                id="city"
                value={values.city}
                onChange={handleChange}
                style={{
                  marginTop: 10,
                  width: '150px',
                  padding: '10px 15px',
                  fontSize: '16px',
                  outline: 'none',
                  border: 'none',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.505)',
                  cursor: 'pointer',
                }}
              >
                <option value="" label="Şehir seçiniz.." />
                <option value="İstanbul" label="İstanbul" />
                <option value="Sakarya" label="Sakarya" />
                <option value="Kocaeli" label="Kocaeli" />
                <option value="Ankara" label="Ankara" />
              </select>

              {errors.city && touched.city && (
                <div className="input-feedback">{errors.city}</div>
              )}

              <div className="checkbox topMargin">
                <input
                  id="agree"
                  type="checkbox"
                  checked={values.agree}
                  onChange={handleChange}
                />
                <label htmlFor="agree" className="checkbox-label">
                  Sözleşmeyi okudum onaylıyorum.
                </label>
              </div>
              {errors.agree && (
                <div className="input-feedback">{errors.agree}</div>
              )}

              <button type="submit" disabled={!dirty || isSubmitting}>
                Kaydol
              </button>
              {/* <button type="button" onClick={handleReset}>
                Formu Sıfırla
              </button> */}
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default App
