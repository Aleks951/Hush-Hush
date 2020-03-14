export interface state {
    text: string,
    params: any,
    types: any,
    showResult: boolean,
    showObj: any
};

const initialState: state = {
    text: "",
    params: new Object(),
    types: new Object(),
    showResult: false,
    showObj: false
};

// Эта функция читает текст полученый из текст бокса
// Сперва текст преобразуеться в массив
// Затем читаеться построчно
// (также создаються три объекта, один для типов, второй для значений, третий (используеться только внутри функции) хранит схемы)
// Если попадаеться слово numeric или string, тогда объектам со значениями и типами присваеваються соответсвующие значения (к примеру типам "text", а значениям "")
// Если попадает что то другое (в данном случае массив) тогда объектам присваеваются в виде значений объекты которые получают свой список ключей и значений
// Для схем запускаеться другой цикл, который создаёт схему и в конечном итоге присваевает её объектам параметры и типы
// При встречи знака "}", цикл завершаеться
// Функция фозвращает два объекта с параметрами и типами

// PARSER
function parser(text: string) {
    let arr = text.split("\n");
    let objParams: any = new Object();
    let objTypes: any = new Object();
    let objSchema: any = new Object();

    for (let i: number = 1; i < arr.length; ++i) {
        let string: string = arr[i];
        string = string.trim();
        if (string === "") continue;
        if (string === "}") break;

        let brokenStr = string.split(" ");

        if (brokenStr[0] === "numeric:") {
            objParams[brokenStr[1]] = NaN;
            objTypes[brokenStr[1]] = "number";
        } else if (brokenStr[0] === "string:") {
            objParams[brokenStr[1]] = "";
            objTypes[brokenStr[1]] = "text";
        } else if (brokenStr[0] === "schema") {
            // SCHEMA
            let name: string | Array<string> = brokenStr[1].split("");
            name.splice(name.length - 1, 1);
            name = name.join("");
            objSchema[name] = new Object();
            let values: any = new Object();

            ++i;
            for (; ; ++i) {
                let string: string = arr[i];
                string = string.trim();

                if (string === "}") {
                    let nameTypesObj = objTypes[name];
                    delete objTypes[name];
                    objTypes[nameTypesObj] = objSchema[name];
                    objParams[nameTypesObj] = {
                        stor: new Array(),
                        values
                    };
                    break;
                };

                let brokenStr = string.split(" ");

                if (brokenStr[0] === "numeric:") {
                    objSchema[name] = {
                        ...objSchema[name],
                        [brokenStr[1]]: "number"
                    };
                    values[brokenStr[1]] = NaN;
                } else if (brokenStr[0] === "string:") {
                    objSchema[name] = {
                        ...objSchema[name],
                        [brokenStr[1]]: "text"
                    };
                    values[brokenStr[1]] = "";
                };
            };
        } else {
            let brokenKey: string | Array<string> = brokenStr[0].split("");
            brokenKey.splice(0, 6);
            brokenKey.splice(brokenKey.length - 2, 2);
            brokenKey = brokenKey.join("");

            if (brokenKey === "numeric") {
                objTypes[brokenStr[1]] = {
                    [brokenStr[1]]: "number"
                };
                objParams[brokenStr[1]] = {
                    stor: new Array(),
                    values: {
                        [brokenStr[1]]: NaN
                    }
                };
            } else if (brokenKey === "string") {
                objTypes[brokenStr[1]] = {
                    [brokenStr[1]]: "text"
                };
                objParams[brokenStr[1]] = {
                    stor: new Array(),
                    values: {
                        [brokenStr[1]]: ""
                    }
                };
            } else {
                objTypes[brokenKey] = brokenStr[1];
            };
        };
    };
    // end cycle
    return {
        params: objParams,
        types: objTypes
    };
};

export default (state = initialState, action: any) => {
    // CHANGESTEXT
    if (action.type === "CHANGESTEXT") {
        return {
            ...state,
            text: action.text
        };
    };

    // READTEXT
    if (action.type === "READTEXT") {
        let obj = parser(state.text);
        return {
            ...state,
            ...obj,
            showResult: true
        };
    };

    // CHANGESINPUT
    if (action.type === "CHANGESINPUT") {
        let params = Object.assign({}, state.params);

        if (action.secondPath) {
            params[action.secondPath].values[action.path] = action.value;
        } else {
            params[action.path] = action.value;
        };

        return {
            ...state,
            params
        };
    };

    // CHANGESOBJEKT
    if (action.type === "CHANGESOBJEKT") {
        return {
            ...state,
            showObj: action.value
        };
    };

    // SAVEDATA
    if (action.type === "SAVEDATA") {
        let params = Object.assign({}, state.params);
        params[state.showObj].stor.push(Object.assign({}, state.params[state.showObj].values));
        let obj = params[state.showObj].values;

        for (let key in obj) {
            if (typeof(obj[key]) === "number") {
                obj[key] = NaN;
            } else {
                obj[key] = "";
            };
        };

        return {
            ...state,
            params
        };
    };

    // DELSTRING
    if (action.type === "DELSTRING") {
        let params = Object.assign({}, state.params);
        let stor = params[state.showObj].stor;
        stor.splice(action.i, 1);

        return {
            ...state,
            params
        };
    };

    return state;
};