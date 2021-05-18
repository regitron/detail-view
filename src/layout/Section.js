import classes from './Section.module.scss';

function Section(props) {
  return <section className={classes.content}>
      {props.children}
  </section>;
}

export default Section;
