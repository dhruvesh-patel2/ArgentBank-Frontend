const Feature = ({ icon, title, text }) => (
  <div className="feature-item">
    <img src={icon} alt={`${title} Icon`} className="feature-icon" />
    <h3 className="feature-item-title">{title}</h3>
    <p>{text}</p>
  </div>
);

const Features = () => {
  return (
    <>
     <Feature
  icon="/img/icon-chat.webp"
  title="You are our #1 priority"
  text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
/>
<Feature
  icon="/img/icon-money.webp"
  title="More savings means higher rates"
  text="The more you save with us, the higher your interest rate will be!"
/>
<Feature
  icon="/img/icon-security.webp"
  title="Security you can trust"
  text="We use top of the line encryption to make sure your data and money is always safe."
/>

    </>
  );
};

export default Features;
