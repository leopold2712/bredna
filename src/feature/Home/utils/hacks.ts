// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const eliminatePolarisCardGap = () => {
  const polarisCard = document.querySelector('.Polaris-Card');
  const child = polarisCard?.firstChild;
  if (child) {
    // @ts-ignore
    if (child.tagName === 'DIV') {
      // @ts-ignore
      if (child.style.minHeight !== '179px') {
        // @ts-ignore
        child.style.minHeight = '179px';
      }
    }
  }
};
