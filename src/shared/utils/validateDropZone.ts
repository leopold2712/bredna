import HeyToast from '../components/HeyToast';

export const validateDropZone = (
  dropFiles: File[],
  acceptedFiles: File[],
  validFormats: string[],
): boolean => {
  if (dropFiles.length > 1) {
    HeyToast.show({ text: 'Please drop only one file', isError: true });
    return false;
  }
  if (acceptedFiles.length === 0) {
    HeyToast.show({
      text: `Please drop following file formats:  ${validFormats.join(', ')}`,
      isError: true,
    });
    return false;
  }
  return true;
};
