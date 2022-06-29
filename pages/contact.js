import Head from "next/head";
import { Fragment } from "react";
import ContactForm from "../components/contact/contact-form";

function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Contactez-moi</title>
        <meta
          name="description"
          content="Envoyez-moi un message pour toute question !"
        />
      </Head>
      <ContactForm />
    </Fragment>
  );
}

export default ContactPage;
