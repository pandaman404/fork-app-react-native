export const updateRadioButtonsState = (arr: any[], i: number) => {
  const data = arr.map((item) => {
    if (item.id == i) {
      item.checked = true;
    } else {
      item.checked = false;
    }
    return item;
  });
  return data;
};
