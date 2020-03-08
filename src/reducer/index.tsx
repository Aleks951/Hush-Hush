interface address {
    street: string,
    city: string,
    postalCode: number
};

export interface state {
    id: number,
    name: string,
    newPhon: number,
    newStreet: string,
    newCity: string,
    newPostalCode: number,
    contactPhones: Array<number>,
    addresses: Array<address>,
    showElement: string
};

const initialState: state = {
    id: NaN,
    name: "",
    newPhon: NaN,
    newStreet: "",
    newCity: "",
    newPostalCode: NaN,
    contactPhones: new Array(),
    addresses: new Array(),
    showElement: "PARENT",
};

export default (state = initialState, action: any) => {
    // CHANGEINPUT
    if (action.type === "CHANGEINPUT") {
        if (action.target === "id") {
            return {
                ...state,
                id: action.value
            };
        } else if (action.target === "name") {
            return {
                ...state,
                name: action.value
            };
        } else if (action.target === "phon") {
            return {
                ...state,
                newPhon: action.value
            };
        } else if (action.target === "street") {
            return {
                ...state,
                newStreet: action.value
            };
        } else if (action.target === "city") {
            return {
                ...state,
                newCity: action.value
            };
        } else if (action.target === "postalCode") {
            return {
                ...state,
                newPostalCode: action.value
            };
        };
    };

    // CHANGESELEMENT
    if (action.type === "CHANGESELEMENT") {
        return {
            ...state,
            showElement: action.showElement
        };
    };

    // SAVEPHONE
    if (action.type === "SAVEPHONE") {
        if (state.newPhon) {
            let contactPhones = state.contactPhones;
            contactPhones.push(state.newPhon);

            return {
                ...state,
                contactPhones,
                newPhon: NaN
            };
        };
    };

    // SAVEADDRESS
    if (action.type === "SAVEADDRESS") {
        if (state.newStreet !== "" && state.newCity !== "" && !isNaN(state.newPostalCode)) {
            let addresses = state.addresses;
            let address: address = {
                street: state.newStreet,
                city: state.newCity,
                postalCode: state.newPostalCode
            };
            addresses.push(address);

            return {
                ...state,
                addresses,
                newStreet: "",
                newCity: "",
                newPostalCode: NaN
            };
        }
    };

    // REMOVPHONE
    if (action.type === "REMOVPHONE") {
        let contactPhones = state.contactPhones;
        contactPhones.splice(action.i, 1)

        return {
            ...state,
            contactPhones
        };
    };

    // REMOVADDRESS
    if (action.type === "REMOVADDRESS") {
        let addresses = state.addresses;
        addresses.splice(action.i, 1)

        return {
            ...state,
            addresses
        };
    };

    return state;
};