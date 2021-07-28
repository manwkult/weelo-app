export function getBase64(image: any): any {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function customRequest (option: any) {
  const formData = new FormData();
  formData.append("files[]", option.file);
  const reader = new FileReader();
  reader.readAsDataURL(option.file);
  reader.onloadend = (e: any) => {     
    if (e && e.target && e.target.result) {
      option.onSuccess();
    }
  };
}
