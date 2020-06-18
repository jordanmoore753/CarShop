import React, { Component } from 'react';

class CarShopDashboard extends Component {
  state = {
    cars: [
      { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
      { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
      { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
      { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
      { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
      { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
      { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
    ],

    filterOptions: {
      make:  'All',
      model: 'All',
      price: 'All',
      year:  'All'
    }
  }

  onFilterChange = (data) => {
    const updatedOptions = Object.assign({}, this.state.filterOptions);
    const attr = data.attr;
    const value = data.value;

    updatedOptions[attr] = value;
    this.setState({ filterOptions: updatedOptions });
  };

  getCars = () => {
    const filterKeys = Object.keys(this.state.filterOptions);
    const filterOptions = this.state.filterOptions;

    let relevantCars = [];
    console.log(this.state.cars)
    this.state.cars.forEach(function(car) {
      if (filterOptions.make !== 'All' && car.make !== filterOptions.make) {
        return;
      } else if (filterOptions.model !== 'All' && car.model !== filterOptions.model) {
        return;
      } else if (filterOptions.price !== 'All' && car.price !== filterOptions.price) {
        return;
      } else if (filterOptions.year !== 'All' && car.year !== filterOptions.year) {
        return;
      }

      relevantCars.push(car);
    });

    return relevantCars;
  };

  render() {
    const cars = this.getCars();

    return (
      <div className="section">
        <FilterMenu 
          filters={this.state.filterOptions}
          onFilterChange={this.onFilterChange}
          cars={this.state.cars}
        />
        <CarGrid 
          cars={this.state.cars}
          filters={this.state.filterOptions}
        />
      </div>
    );
  }
}

class FilterMenu extends Component {
  getAllOptions = () => {
    const filters = this.props.filters;
    const cars = this.props.cars;

    let options = {
      make: ['All'],
      model: ['All'],
      year: ['All'],
      price: ['All']
    };

    cars.forEach(function(car) {
      if (filters.make !== 'All' && filters.make !== car.make) {
        return;
      }

      if (filters.model !== 'All' && filters.model !== car.model) {
        return;
      }

      if (filters.price !== 'All' && filters.price !== car.price) {
        return;
      }

      if (filters.year !== 'All' && filters.year !== car.year) {
        return;
      }

      ['make', 'model', 'price', 'year'].forEach((key) => options[key].push(car[key]));
    });

    return options;
  };

  handleChange = (e) => {
    const attr = e.currentTarget.name;
    const value = e.target.value;
    const data = {
      attr: attr,
      value: value
    };

    this.props.onFilterChange(data);
  };

  render() {
    const options = this.getAllOptions();

    return (
      <form>
        <div className="select">
          <select 
            name="make"
            value={this.props.filters.make}
            onChange={this.handleChange}
          >
            {options.make.map(function(option, i) {
              return (
                <option key={i} value={option}>{option}</option>
              );
            })}
          </select>
        </div>
        <div className="select">
          <select 
            name="model"
            value={this.props.filters.model}
            onChange={this.handleChange}
          >
            {options.model.map(function(option, i) {
              return (
                <option key={i} value={option}>{option}</option>
              );
            })}
          </select>
        </div>
        <div className="select">
          <select 
            name="price"
            value={this.props.filters.price}
            onChange={this.handleChange}
          >
            {options.price.map(function(option, i) {
              return (
                <option key={i} value={option}>{option}</option>
              );
            })}
          </select>
        </div>
        <div className="select">
          <select 
            name="year"
            value={this.props.filters.year}
            onChange={this.handleChange}
          >
            {options.year.map(function(option, i) {
              return (
                <option key={i} value={option}>{option}</option>
              );
            })}
          </select>
        </div>
      </form>
    );
  }
}

class CarGrid extends Component {
  getCars = () => {
    const filterKeys = Object.keys(this.props.filters);
    const filterOptions = this.props.filters;

    let cars = this.props.cars.slice(0);
    let relevantCars = [];

    cars.forEach(function(car) {
      if (filterOptions.make !== 'All' && car.make !== filterOptions.make) {
        return;
      } else if (filterOptions.model !== 'All' && car.model !== filterOptions.model) {
        return;
      } else if (filterOptions.price !== 'All' && car.price !== filterOptions.price) {
        return;
      } else if (filterOptions.year !== 'All' && car.year !== filterOptions.year) {
        return;
      }

      relevantCars.push(car);
    });

    return relevantCars;
  };

  render() {
    const cars = this.getCars();

    return (
      <div id="car-grid-container">
        <div className="columns is-multiline">
          {cars.map(function(car, i) {
            return (
              <Car 
                key={i}
                make={car.make}
                model={car.model}
                year={car.year}
                price={car.price}
                image={car.image}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

class Car extends Component {
  render() {
    return (
      <div className="column">
        <p>{this.props.make}</p>
        <p>{this.props.model}</p>
        <p>{this.props.year}</p>
        <img src={this.props.image} />
        <p>{this.props.price}</p>
      </div>
    );
  }
}

export default CarShopDashboard;