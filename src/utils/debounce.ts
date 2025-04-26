export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  const debounced = function(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn(...args), delay);
  };
  
  // Add cancel method
  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
  
  return debounced;
}