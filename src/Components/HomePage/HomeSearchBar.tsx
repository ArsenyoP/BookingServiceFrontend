import { useState } from "react"

export const HomeSearchBar = () => {
    const [selectedCountry, setSelectedCountry] = useState('')
    const [city, setCity] = useState('')
    const countriesCities = {
      USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
      France: ['Paris', 'Lyon', 'Marseille', 'Nice'],
      Japan: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama'],
      Brazil: ['Rio de Janeiro', 'Sao Paulo', 'Brasilia', 'Salvador'],
    }
    const cities = selectedCountry ? countriesCities[selectedCountry] || [] : []
  
    const handleCountryChange = (e) => {
      setSelectedCountry(e.target.value)
      setCity('')
    }

    return <div className="container">
    <h2>Find your perfect stay</h2>
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <div className="field">
        <label>Country</label>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {Object.keys(countriesCities).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>City</label>
        <input
          list="city-list"
          placeholder="Type or select city"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <datalist id="city-list">
          {cities.map(c => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>
      <div className="field">
        <label>Guests</label>
        <select>
          <option>1 guest</option>
          <option>2 guests</option>
          <option>3 guests</option>
          <option>4+ guests</option>
        </select>
      </div>
      <button type="submit">Search</button>
    </form>
  </div>
}