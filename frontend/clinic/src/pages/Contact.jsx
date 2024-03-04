import React from "react";

const Contact = () => {
  return (
    <>
      <section>
        <div className="px-4 mx-auto max-w-screen-md ">
          <h2 className="heading text-center">Contact Us</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text__para">
            Got a technical issue? Want to send feedback about a beta feature?
            Let us know
          </p>
          <form action="" className="space-y-8">
            <div>
              <label htmlFor="contact_email" className="form_label">
                Your Email
              </label>
              <input
                type="email"
                id="contact_email"
                placeholder="example@email.com"
                className="form__input mt-1"
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="contact_subject" className="form_label">
                Subject
              </label>
              <input
                type="text"
                id="contact_subject"
                placeholder="Let us know how we can helo you"
                className="form__input mt-1"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact_message" className="form_label">
                Subject
              </label>
              <textarea name="contact_message" id="contact_message" rows="6" placeholder="Leave a comment ...." className="form__input mt-1" />
            </div>
            <button type="submit" className="btn rounded sm:w-fit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
