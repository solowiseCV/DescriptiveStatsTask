class DescriptiveStatistics {
    constructor(data) {
      this.data = data;
      this.isGrouped = Array.isArray(data[0]) && data[0].hasOwnProperty("value") && data[0].hasOwnProperty("frequency");//checking if the data is grouped
    }
    mean() {
        if (Array.isArray(this.data) && this.data.length > 0) {
          // Check if the data is grouped or ungrouped
          if (typeof this.data[0] === 'object' && 'value' in this.data[0]) {
            // Grouped data
            return this.calculateGroupedMean();
          } else {
            // Ungrouped data
            return this.calculateUngroupedMean();
          }
        } else {
          throw new Error('Invalid data. Please provide a non-empty array.');
        }
      }

    calculateUngroupedMean() {
        // Calculate the sum of all values in data 
        const sum = this.data.reduce((acc, value) => acc + value, 0);//acc is the accumulator, value is the current value in the array
        
        const mean = sum / this.data.length;//divide the sum by the number of elements in the array
        return mean;  
      }
    

      calculateGroupedMean() {
        let sum = 0;
        let totalCount = 0;
       
        this.data.forEach(group => {
          if ('value' in group && 'frequency' in group) {
            sum += group.value * group.frequency;
            totalCount += group.frequency;
          } else {
            
            throw new Error('Invalid grouped data format. Each group should have "value" and "frequency" properties.');
          }
        });
    
        const mean = sum / totalCount;
        return mean;
      }


      //median method
       
  median() {
    
    if (Array.isArray(this.data) && this.data.length > 0) {
      // Check if the data is grouped or ungrouped
      if (typeof this.data[0] === 'object' && 'value' in this.data[0]) {
        
        //if Grouped data return this method
        return this.calculateGroupedMedian();
      } else {
        //if its Ungrouped data return this method
        return this.calculateUngroupedMedian();
      }
    } else {
      throw new Error('Invalid data. Please provide a non-empty array.');
    }
  }

  calculateUngroupedMedian() {
    // Sort the data in ascending order
    const sortedData = this.data.slice().sort((a, b) => a - b);

    if (sortedData.length % 2 === 0) {//if the length of the array is even
      
      // If the data length is even, average the middle two values
      const middle1 = sortedData[sortedData.length / 2 - 1];//the middle value
      const middle2 = sortedData[sortedData.length / 2];
      return (middle1 + middle2) / 2;
    } else {
      // If the data length is odd, return the middle value
      return sortedData[Math.floor(sortedData.length / 2)];
    }
  }

  calculateGroupedMedian() {
    const sortedData = this.flattenGroupedData().sort((a, b) => a - b);

    if (sortedData.length % 2 === 0) {
      // If the data length is even, average the middle two values
      const middle1 = sortedData[sortedData.length / 2 - 1];
      const middle2 = sortedData[sortedData.length / 2];
      return (middle1 + middle2) / 2;
    } else {
      // If the data length is odd, return the middle value
      return sortedData[Math.floor(sortedData.length / 2)];
    }
  }

  flattenGroupedData() {
    let flattenedData = [];

    this.data.forEach(group => {
      if ('value' in group && 'frequency' in group) {
        for (let i = 0; i < group.frequency; i++) {
          flattenedData.push(group.value);
        }
      } else {
        throw new Error('Invalid grouped data format. Each group should have "value" and "frequency" properties.');
      }
    });

    return flattenedData;
  }

  //mode
  mode() {
    if (Array.isArray(this.data) && this.data.length > 0) {
      // Check if the data is grouped or ungrouped
      if (typeof this.data[0] === 'object' && 'value' in this.data[0]) {
        //if  Grouped data return this method
        return this.calculateGroupedMode();
      } else {
        //if Ungrouped data retrun this method
        return this.calculateUngroupedMode();
      }
    } else {
      throw new Error('Invalid data. Please provide a non-empty array.');
    }
  }

  calculateUngroupedMode() {
    const frequencyMap = new Map();//create a map to store the frequency of each value

    // Count the frequency of each value
    this.data.forEach(value => {
      frequencyMap.set(value, (frequencyMap.get(value) || 0) + 1);
    });

    // Find the mode(s)
    let modes = [];
    let maxFrequency = 0;

    frequencyMap.forEach((frequency, value) => {
      if (frequency > maxFrequency) {
        modes = [value];
        maxFrequency = frequency;
      } else if (frequency === maxFrequency) {
        modes.push(value);
      }
    });

    return modes.length === this.data.length ? 'No mode' : modes;
  }

  calculateGroupedMode() {
    const frequencyMap = new Map();

    // Count the frequency of each grouped value
    this.data.forEach(group => {
      if ('value' in group && 'frequency' in group) {
        frequencyMap.set(group.value, (frequencyMap.get(group.value) || 0) + group.frequency);
      } else {
        throw new Error('Invalid grouped data format. Each group should have "value" and "frequency" properties.');
      }
    });

    // Find the mode(s)
    let modes = [];
    let maxFrequency = 0;

    frequencyMap.forEach((frequency, value) => {
      if (frequency > maxFrequency) {
        modes = [value];
        maxFrequency = frequency;
      } else if (frequency === maxFrequency) {
        modes.push(value);
      }
    });

    return modes.length === this.data.length ? 'No mode' : modes;
  
}


  //range
  range() {
    if (Array.isArray(this.data) && this.data.length > 0) {
      // Check if the data is grouped or ungrouped
      if (typeof this.data[0] === 'object' && 'value' in this.data[0]) {
        // Grouped data
        return this.calculateGroupedRange();
      } else {
        // Ungrouped data
        return this.calculateUngroupedRange();
      }
    } else {
      throw new Error('Invalid data. Please provide a non-empty array.');
    }
  }

  calculateUngroupedRange() {
    const min = Math.min(...this.data);
    const max = Math.max(...this.data);
    const range = max - min;
    return range;
  }

  calculateGroupedRange() {
    let min;
    let max;

    this.data.forEach(group => {
      if ('value' in group) {
        if (min === undefined || group.value < min) {
          min = group.value;
        }

        if (max === undefined || group.value > max) {
          max = group.value;
        }
      } else {
        throw new Error('Invalid grouped data format. Each group should have a "value" property.');
      }
    });

    const range = max - min;
    return range;
  }
  
 //variance
  variance() {
    if (Array.isArray(this.data) && this.data.length > 0) {
      // Check if the data is grouped or ungrouped
      if (typeof this.data[0] === 'object' && 'value' in this.data[0]) {
        // Grouped data
        return this.calculateGroupedVariance();
      } else {
        // Ungrouped data
        return this.calculateUngroupedVariance();
      }
    } else {
      throw new Error('Invalid data. Please provide a non-empty array.');
    }
  }

  calculateUngroupedVariance() {
    const mean = this.calculateMean(this.data);
    const squaredDifferences = this.data.map(value => Math.pow(value - mean, 2));
    const sumSquaredDifferences = squaredDifferences.reduce((acc, value) => acc + value, 0);
    const variance = sumSquaredDifferences / this.data.length;
    return variance;
  }

  calculateGroupedVariance() {
    const mean = this.calculateGroupedMean();
    let sumSquaredDifferences = 0;
    let totalCount = 0;

    this.data.forEach(group => {
      if ('value' in group && 'frequency' in group) {
        const squaredDifference = Math.pow(group.value - mean, 2);
        sumSquaredDifferences += squaredDifference * group.frequency;
        totalCount += group.frequency;
      } else {
        throw new Error('Invalid grouped data format. Each group should have "value" and "frequency" properties.');
      }
    });

    const variance = sumSquaredDifferences / totalCount;
    return variance;
  }

  calculateMean(data) {
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
  }

  calculateGroupedMean() {
    let sum = 0;
    let totalCount = 0;

    this.data.forEach(group => {
      if ('value' in group && 'frequency' in group) {
        sum += group.value * group.frequency;
        totalCount += group.frequency;
      } else {
        throw new Error('Invalid grouped data format. Each group should have "value" and "frequency" properties.');
      }
    });

    return sum / totalCount;
  }


  standardDeviation() {
    return Math.sqrt(this.variance());
  }
//Mean Deviation
  
  meanDeviation() {
    if (Array.isArray(this.data) && this.data.length > 0) {
      // Check if the data is grouped or ungrouped
      if (typeof this.data[0] === 'object' && 'value' in this.data[0]) {
        // Grouped data
        return this.calculateGroupedMeanDeviation();
      } else {
        // Ungrouped data
        return this.calculateUngroupedMeanDeviation();
      }
    } else {
      throw new Error('Invalid data. Please provide a non-empty array.');
    }
  }

  calculateUngroupedMeanDeviation() {
    const mean = this.calculateMean(this.data);
    const deviations = this.data.map(value => Math.abs(value - mean));
    const meanDeviation = deviations.reduce((acc, deviation) => acc + deviation, 0) / this.data.length;
    return meanDeviation;
  }

  calculateGroupedMeanDeviation() {
    const mean = this.calculateGroupedMean();
    let sumDeviation = 0;
    let totalCount = 0;

    this.data.forEach(group => {
      if ('value' in group && 'frequency' in group) {
        const deviation = Math.abs(group.value - mean);
        sumDeviation += deviation * group.frequency;
        totalCount += group.frequency;
      } else {
        throw new Error('Invalid grouped data format. Each group should have "value" and "frequency" properties.');
      }
    });

    const meanDeviation = sumDeviation / totalCount;
    return meanDeviation;
  }

  calculateMean(data) {
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
  }

  calculateGroupedMean() {
    let sum = 0;
    let totalCount = 0;

    this.data.forEach(group => {
      if ('value' in group && 'frequency' in group) {
        sum += group.value * group.frequency;
        totalCount += group.frequency;
      } else {
        throw new Error('Invalid grouped data format. Each group should have "value" and "frequency" properties.');
      }
    });

    return sum / totalCount;
  }

  //Quatile deviation
   quartileDeviation() {
      if (Array.isArray(this.data) && this.data.length > 0) {
        // Check if the data is grouped or ungrouped
        if (typeof this.data[0] === 'object' && 'value' in this.data[0]) {
          // Grouped data
          return this.calculateGroupedQuartileDeviation();
        } else {
          // Ungrouped data
          return this.calculateUngroupedQuartileDeviation();
        }
      } else {
        throw new Error('Invalid data. Please provide a non-empty array.');
      }
    }

    calculateUngroupedQuartileDeviation() {
      const lowerQuartile = this.calculateQuantile(this.data, 0.25);
      const upperQuartile = this.calculateQuantile(this.data, 0.75);
      const interquartileRange = upperQuartile - lowerQuartile;
      const quartileDeviation = interquartileRange / 2;
      return quartileDeviation;
    }

    calculateGroupedQuartileDeviation() {
      const lowerQuartile = this.calculateGroupedQuantile(0.25);
      const upperQuartile = this.calculateGroupedQuantile(0.75);
      const interquartileRange = upperQuartile - lowerQuartile;
      const quartileDeviation = interquartileRange / 2;
      return quartileDeviation;
    }

    calculateQuantile(sortedData, quantile) {
      const position = quantile * (sortedData.length + 1);
      const integerPart = Math.floor(position);
      const decimalPart = position - integerPart;

      if (decimalPart === 0) {
        return sortedData[integerPart - 1];
      } else {
        return sortedData[integerPart - 1] + decimalPart * (sortedData[integerPart] - sortedData[integerPart - 1]);
      }
    }

    calculateGroupedQuantile(quantile) {
      const sortedData = this.flattenGroupedData().sort((a, b) => a - b);
      return this.calculateQuantile(sortedData, quantile);
    }

    flattenGroupedData() {
      let flattenedData = [];

      this.data.forEach(group => {
        if ('value' in group && 'frequency' in group) {
          for (let i = 0; i < group.frequency; i++) {
            flattenedData.push(group.value);
          }
        } else {
          throw new Error('Invalid grouped data format. Each group should have "value" and "frequency" properties.');
        }
      });

      return flattenedData;
    }
  

  //interquartileRange
  interquartileRange() {
      if (Array.isArray(this.data) && this.data.length > 0) {
        // Check if the data is grouped or ungrouped
        if (typeof this.data[0] === 'object' && 'value' in this.data[0]) {
          // Grouped data
          return this.calculateGroupedInterquartileRange();
        } else {
          // Ungrouped data
          return this.calculateUngroupedInterquartileRange();
        }
      } else {
        throw new Error('Invalid data. Please provide a non-empty array.');
      }
    }

    calculateUngroupedInterquartileRange() {
      const sortedData = this.data.slice().sort((a, b) => a - b);

      const lowerQuartile = this.calculateQuantile(sortedData, 0.25);
      const upperQuartile = this.calculateQuantile(sortedData, 0.75);

      const interquartileRange = upperQuartile - lowerQuartile;
      return interquartileRange;
    }

    calculateGroupedInterquartileRange() {
      const sortedData = this.flattenGroupedData().sort((a, b) => a - b);

      const lowerQuartile = this.calculateQuantile(sortedData, 0.25);
      const upperQuartile = this.calculateQuantile(sortedData, 0.75);

      const interquartileRange = upperQuartile - lowerQuartile;
      return interquartileRange;
    }

    flattenGroupedData() {
      let flattenedData = [];

      this.data.forEach(group => {
        if ('value' in group && 'frequency' in group) {
          for (let i = 0; i < group.frequency; i++) {
            flattenedData.push(group.value);
          }
        } else {
          throw new Error('Invalid grouped data format. Each group should have "value" and "frequency" properties.');
        }
      });

      return flattenedData;
    }

    calculateQuantile(sortedData, quantile) {
      const position = quantile * (sortedData.length + 1);
      const integerPart = Math.floor(position);
      const decimalPart = position - integerPart;

      if (decimalPart === 0) {
        return sortedData[integerPart - 1];
      } else {
        return sortedData[integerPart - 1] + decimalPart * (sortedData[integerPart] - sortedData[integerPart - 1]);
      }
    }
  
}

const ungroupedData = [4, 8, 6, 5, 3, 2, 8, 9, 1, 5];
const groupedData = [
  { value: 7, frequency: 2 },
  { value: 3, frequency: 4 },
  { value: 4, frequency: 2 },
];

const ungroupedStats = new DescriptiveStatistics(ungroupedData);
const groupedStats = new DescriptiveStatistics(groupedData);

console.log("Ungrouped Mean:", ungroupedStats.mean());
console.log("Grouped Mean:", groupedStats.mean());

console.log("Ungrouped Median:", ungroupedStats.median());
console.log("Grouped Median:", groupedStats.median());

console.log("Ungrouped Mode:", ungroupedStats.mode());
console.log("Grouped Mode:", groupedStats.mode());
console.log("Ungrouped Range:", ungroupedStats.range());
console.log("Grouped Range:", groupedStats.range());

console.log("Ungrouped Variance:", ungroupedStats.variance());
console.log("Grouped Variance:", groupedStats.variance());

console.log("Ungrouped Standard Deviation:", ungroupedStats.standardDeviation());
console.log("Grouped Standard Deviation:", groupedStats.standardDeviation());

console.log("Ungrouped Mean Deviation:", ungroupedStats.meanDeviation());
console.log("Grouped Mean Deviation:", groupedStats.meanDeviation());

console.log("Ungrouped Quartile Deviation:", ungroupedStats.quartileDeviation());
console.log("Grouped Quatile Deviation:", groupedStats.quartileDeviation())
console.log("Ungrouped Interquatile Range:", ungroupedStats.interquartileRange());
console.log("Grouped Interquartile Range:", groupedStats.interquartileRange());
