import { Country } from "country-state-city"

export function getCountires(data){
    const general_options = {}
    data.map( item => {
        general_options[item.title] = item.value
    })
    general_options['shipping_countries'] = general_options['shipping_countries'].length > 0 ? general_options['shipping_countries'].split(';') : []
    general_options['specific_countries'] = general_options['specific_countries'].length > 0 ? general_options['specific_countries'].split(';') : []
    general_options['exception_countries'] = general_options['exception_countries'].length > 0 ? general_options['exception_countries'].split(';') : []

    let countires = []
    // check selling locations first

    
    if (general_options['selling_locations'] == 'all_countries'){
        // if you sell to all countries

        if(general_options['shipping_locations'] == 'ship_to_all_countries_you_sell_to' || general_options['shipping_locations'] == 'ship_to_all_countries'){
            // ... and if you ship to all countries you sell to
            countires = Country.getAllCountries()
        }else if (general_options['shipping_locations'] == 'deliver_to_specific_countries'){
            // ... and if you ship to specific countries
            countires = general_options['shipping_countries'].map(country => Country.getCountryByCode(country))
        }else{
            // TODO: what to do id shiping is disabled
        }
        
    }else if(general_options['selling_locations'] == 'all_countries_except_for') {
        // if you sell to all countries except for some
        if(general_options['shipping_locations'] == 'ship_to_all_countries_you_sell_to' || general_options['shipping_locations'] == 'ship_to_all_countries'){
            // ... and if you ship to all countries you sell to
            countires = Country.getAllCountries().filter(country => !general_options['exception_countries'].includes(country.isoCode))

        }else if (general_options['shipping_locations'] == 'deliver_to_specific_countries'){
            // ... and if you ship to specific countries
            countires = general_options['shipping_countries'].map(country => Country.getCountryByCode(country))

        }else{
            // TODO: what to do id shiping is disabled
        }
    }else {
        // you sell to specific countries
        if(general_options['shipping_locations'] == 'ship_to_all_countries_you_sell_to' || general_options['shipping_locations'] == 'ship_to_all_countries'){
            // ... if you ship to all countries you sell to
            countires = Country.getAllCountries().filter(country => general_options['specific_countries'].includes(country.isoCode))

        }else if (general_options['shipping_locations'] == 'deliver_to_specific_countries'){
            // ... if you ship to specific countries
            countires = general_options['shipping_countries'].map(country => Country.getCountryByCode(country))

        }else{
            // TODO: what to do id shiping is disabled
        }
    }

    return countires;
}