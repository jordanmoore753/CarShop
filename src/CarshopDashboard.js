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
    let cars = this.state.cars;

    for (let i = 0; i < cars.length; i += 1) {
      if (cars[i].make !== filterOptions.make && filterOptions.make !== 'All') {
        continue;
      }

      if (cars[i].model !== filterOptions.model && filterOptions.model !== 'All') {
        continue;
      }     

      if (cars[i].price !== Number(filterOptions.price) && filterOptions.price !== 'All') {
        continue;
      } 

      if (cars[i].year !== Number(filterOptions.year) && filterOptions.year !== 'All') {
        continue;
      }

      relevantCars.push(cars[i]);
    }

    return relevantCars;
  };

  render() {
    const cars = this.getCars();

    return (
      <div className="section">
        <FilterMenu 
          filters={this.state.filterOptions}
          onFilterChange={this.onFilterChange}
          cars={cars}
        />
        <CarGrid 
          cars={cars}
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
      ['make', 'model', 'price', 'year'].forEach(function(key) { 
        if (!options[key].includes(car[key])) {
          options[key].push(car[key]);
        }
      });
    });

    options.price.sort((a, b) => a - b);
    options.year.sort((a, b) => a - b);
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
  render() {
    return (
      <div id="car-grid-container">
        <div className="columns is-multiline">
          {this.props.cars.map(function(car, i) {
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