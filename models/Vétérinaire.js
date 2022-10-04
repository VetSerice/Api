class Veterinaire {

    constructor(nomdeVeto,prenomveto, emailveto, dateDenaisssance, motDepasseVeto,spe,Valid, paiment,num,cityv,pays,codePostal) {
        this._nomdeVeto= nomdeVeto;
        this._prenomveto = prenomveto;
        this._emailveto = emailveto;
        this._motDepasseVeto = motDepasseVeto;
        this._num = num;
        this._dateDenaisssance = dateDenaisssance;
        this._spe = spe;
        this._Valid = Valid;
        this._cityv = cityv;
        this._pays = pays;
        this._codePostal = codePostal;
        this._paiment = paiment;



}


    get nomdeVeto() {
        return this._nomdeVeto;
    }

    get prenomveto() {
        return this._prenomveto;
    }

    get emailveto() {
        return this._emailveto;
    }

    get dateDenaisssance() {
        return this._dateDenaisssance;
    }

    get motDepasseVeto() {
        return this._motDepasseVeto;
    }

    get spe() {
        return this._spe;
    }

    get Valid() {
        return this._Valid;
    }

    get paiment() {
        return this._paiment;
    }

    get num() {
        return this._num;
    }

    get cityv() {
        return this._cityv;
    }

    get pays() {
        return this._pays;
    }

    get codePostal() {
        return this._codePostal;
    }
}

module.exports = { Veterinaire };