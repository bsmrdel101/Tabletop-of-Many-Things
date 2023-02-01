export const toggleModal = (modalName: string) => {  
  document.getElementById(`modal-${modalName}`).classList.toggle('hidden');
};
