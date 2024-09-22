export function processData(data: string[]) {
    const numbers: string[] = [];
    const alphabets: string[] = [];
    let highestLowercase = "";
  
    data.forEach((item) => {
      if (/^\d+$/.test(item)) {
        numbers.push(item);
      } else if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
        if (item === item.toLowerCase() && item > highestLowercase) {
          highestLowercase = item;
        }
      }
    });
  
    return {
      numbers,
      alphabets,
      highestLowercase: highestLowercase ? [highestLowercase] : [],
    };
  }