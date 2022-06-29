import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/kw_small.jpg"
          alt="Image de Kevin"
          width={600}
          height={600}
        />
      </div>
      <h1>Salut ! Je suis Kevin</h1>
      <p>
        Je poste des articles de blog sur le développement web, en particulier
        sur le CSS.
      </p>
    </section>
  );
}

export default Hero;
