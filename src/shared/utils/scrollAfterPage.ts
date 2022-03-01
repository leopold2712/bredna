export const scrollAfterPageChange = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
