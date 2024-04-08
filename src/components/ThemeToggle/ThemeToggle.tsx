import "./ThemeToggle.scss";

interface Props {
  onSwitch?: () => void;
}

const ThemeToggle = ({onSwitch}: Props) => {

  return (
    <div className="theme-switch">
      <input onChange={onSwitch} type="checkbox" id="switch" />
      <label htmlFor="switch">Toggle</label>
    </div>
  );
};

export default ThemeToggle;
