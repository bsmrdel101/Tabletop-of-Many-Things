export const ready = (fn: any) => {
    document.addEventListener('DOMContentLoaded', () => {
        fn();
    });
};
