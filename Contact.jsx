import { useState } from "react";
import { useToast } from "../context/ToastContext";

function Contact() {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(event) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    showToast("Your message has been submitted!");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <div className="container page-section">
      <div className="page-heading">
        <span className="eyebrow">WE'D LOVE TO HEAR FROM YOU</span>
        <h1>Get in touch</h1>
        <p>Have a question about dining, catering or a special event?</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <h2>Let's talk.</h2>

          <p>
            Send us your enquiry and our team will be happy to help.
          </p>

          <div className="contact-detail">
            <span>VISIT US</span>
            <p>123 Garden Street, Chennai, India</p>
          </div>

          <div className="contact-detail">
            <span>CALL US</span>
            <p>+91 98765 43210</p>
          </div>

          <div className="contact-detail">
            <span>EMAIL</span>
            <p>hello@vanadxs.example</p>
          </div>

          <div className="contact-detail">
            <span>OPENING HOURS</span>
            <p>Monday – Sunday: 11:00 AM – 10:00 PM</p>
          </div>
        </div>

        <section className="form-card contact-form-card">
          <h2>Send us a message</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">Your name *</label>
              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                maxLength={80}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email *</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject *</label>
              <input
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                maxLength={120}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
                maxLength={1000}
              />
            </div>

            <button type="submit" className="button button-primary">
              Send Message →
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Contact;