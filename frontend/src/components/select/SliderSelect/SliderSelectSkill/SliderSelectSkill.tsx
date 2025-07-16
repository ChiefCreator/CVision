import React from "react"

import SliderSelect from "../SliderSelect";

import type { SliderSelectProps } from "../SliderSelect";

import styles from "./SliderSelectSkill.module.scss";
import clsx from "clsx";

interface SliderSelectSkillProps extends SliderSelectProps {}

export default React.memo(function SliderSelectSkill(props: SliderSelectSkillProps) {
  return (
    <SliderSelect
      className={clsx(styles.slider, styles.sliderTheme)}
      {...props}
    />
  );
})