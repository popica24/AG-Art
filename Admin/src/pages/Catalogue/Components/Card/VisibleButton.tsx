type Props = {
  visible: boolean;
  toggle: () => void;
};

const VisibleButton = (props: Props) => {
  return (
    <span className="inline-flex items-center">
      <input
        type="checkbox"
        checked={props.visible}
        onClick={() => props.toggle()}
      />
    </span>
  );
};

export default VisibleButton;
