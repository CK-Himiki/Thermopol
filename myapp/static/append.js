function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
$(function() {
const literatura = document.getElementById('literatura');
        const phases = document.getElementById('phases');
        literatureList = []; // Глобальная переменная для хранения списка литературы

        function addSource() {
            const descriptionInput = document.getElementById('description');
            const urlInput = document.getElementById('url');
            const doiInput = document.getElementById('doi');

            const description = descriptionInput.value.trim();
            const url = urlInput.value.trim();
            const doi = doiInput.value.trim();

            if (description) {
                const literatureItem = {
                    description: description,
                    url: url,
                    doi: doi
                };

                literatureList.push(literatureItem);

                const option = document.createElement('option');
                option.value = description;
                option.textContent = description;
                literatura.add(option);

                descriptionInput.value = '';
                urlInput.value = '';
                doiInput.value = '';
            }
        }
        document.getElementById("add_source_btn").addEventListener('click',addSource);
        literatura.addEventListener('click', function(event) {
            const selectedOption = event.target;
            const selectedIndex = Array.prototype.indexOf.call(literatura.children, selectedOption);
            const selectedLiterature = literatureList[selectedIndex];

            if (selectedLiterature) {
                document.getElementById('description').value = selectedLiterature.description;
                document.getElementById('url').value = selectedLiterature.url;
                document.getElementById('doi').value = selectedLiterature.doi;
            }
        });

propertiesList = [];

function addProperty() {
    const agregateStateInput = document.getElementById('agregate_state');
    const numberPhaseInput = document.getElementById('number_phase');
    const degreeOfCrystallinityInput = document.getElementById('degree_of_crystallinity');
    const enthalpyOfCombustionInput = document.getElementById('enthalpy_of_combustion');
    const enthalpyOfCombustionErrInput = document.getElementById('enthalpy_of_combustion_err');
    const enthalpyOfFormationInput = document.getElementById('enthalpy_of_formation');
    const enthalpyOfFormationErrInput = document.getElementById('enthalpy_of_formation_err');
    const entropyOfFormationInput = document.getElementById('entropy_of_formation');
    const entropyOfFormationErrInput = document.getElementById('entropy_of_formation_err');
    const gibbsEnergyOfFormationInput = document.getElementById('gibbs_energy_of_formation');
    const gibbsEnergyOfFormationErrInput = document.getElementById('gibbs_energy_of_formation_err');
    const lnKInput = document.getElementById('lnK');
    const residualEntropyAt0KInput = document.getElementById('residual_entropy_at_0_k');
    const residualEntropyAt0KErrInput = document.getElementById('residual_entropy_at_0_k_err');
    const configurationalEntropyInput = document.getElementById('configurational_entropy');
    const configurationalEntropyErrInput = document.getElementById('configurational_entropy_err');
    const differenceOfZeroInput = document.getElementById('difference_of_zero');
    const differenceOfZeroErrInput = document.getElementById('difference_of_zero_err');
    const TInput = document.getElementById('T');
    const CpInput = document.getElementById('Cp');
    const HTH0Input = document.getElementById('HT_H0');
    const STInput = document.getElementById('ST');
    const GTInput = document.getElementById('GT');


    const agregateState = agregateStateInput.value.trim();
    const numberPhase = numberPhaseInput.value.trim();
    const degreeOfCrystallinity = degreeOfCrystallinityInput.value.trim();
    const enthalpyOfCombustion = enthalpyOfCombustionInput.value.trim();
    const enthalpyOfCombustionErr = enthalpyOfCombustionErrInput.value.trim();
    const enthalpyOfFormation = enthalpyOfFormationInput.value.trim();
    const enthalpyOfFormationErr = enthalpyOfFormationErrInput.value.trim();
    const entropyOfFormation = entropyOfFormationInput.value.trim();
    const entropyOfFormationErr = entropyOfFormationErrInput.value.trim();
    const gibbsEnergyOfFormation = gibbsEnergyOfFormationInput.value.trim();
    const gibbsEnergyOfFormationErr = gibbsEnergyOfFormationErrInput.value.trim();
    const lnK = lnKInput.value.trim();
    const residualEntropyAt0K = residualEntropyAt0KInput.value.trim();
    const residualEntropyAt0KErr = residualEntropyAt0KErrInput.value.trim();
    const configurationalEntropy = configurationalEntropyInput.value.trim();
    const configurationalEntropyErr = configurationalEntropyErrInput.value.trim();
    const differenceOfZero = differenceOfZeroInput.value.trim();
    const differenceOfZeroErr = differenceOfZeroErrInput.value.trim();
    const T = TInput.value.trim();
    const Cp = CpInput.value.trim();
    const HTH0 = HTH0Input.value.trim();
    const ST = STInput.value.trim();
    const GT = GTInput.value.trim();

     {
        const property = {
            agregateState: agregateState,
            numberPhase: numberPhase,
            degreeOfCrystallinity: degreeOfCrystallinity,
            enthalpyOfCombustion: enthalpyOfCombustion,
            enthalpyOfCombustionErr: enthalpyOfCombustionErr,
            enthalpyOfFormation: enthalpyOfFormation,
            enthalpyOfFormationErr: enthalpyOfFormationErr,
            entropyOfFormation: entropyOfFormation,
            entropyOfFormationErr: entropyOfFormationErr,
            gibbsEnergyOfFormation: gibbsEnergyOfFormation,
            gibbsEnergyOfFormationErr: gibbsEnergyOfFormationErr,
            lnK: lnK,
            residualEntropyAt0K: residualEntropyAt0K,
            residualEntropyAt0KErr: residualEntropyAt0KErr,
            configurationalEntropy: configurationalEntropy,
            configurationalEntropyErr: configurationalEntropyErr,
            differenceOfZero: differenceOfZero,
            differenceOfZeroErr: differenceOfZeroErr,
            T: T,
            Cp: Cp,
            HTH0: HTH0,
            ST: ST,
            GT: GT
        };

        propertiesList.push(property);

        const option = document.createElement('option');
        option.value = agregateState;
        option.textContent = agregateState;
        document.getElementById('properties').add(option);

        stateInput.value = '';
        agregateStateInput.value = '';
        numberPhaseInput.value = '';
        degreeOfCrystallinityInput.value = '';
        enthalpyOfCombustionInput.value = '';
        enthalpyOfCombustionErrInput.value = '';
        enthalpyOfFormationInput.value = '';
        enthalpyOfFormationErrInput.value = '';
        entropyOfFormationInput.value = '';
        entropyOfFormationErrInput.value = '';
        gibbsEnergyOfFormationInput.value = '';
        gibbsEnergyOfFormationErrInput.value = '';
        lnKInput.value = '';
        residualEntropyAt0KInput.value = '';
        residualEntropyAt0KErrInput.value = '';
        configurationalEntropyInput.value = '';
        configurationalEntropyErrInput.value = '';
        differenceOfZeroInput.value = '';
        differenceOfZeroErrInput.value = '';
        TInput.value = '';
        CpInput.value = '';
        HTH0Input.value = '';
        STInput.value = '';
        GTInput.value = '';
    }
}
document.getElementById("add_phase_btn").addEventListener('click',addProperty);
function fillPropertyFields( agregateState, numberPhase, degreeOfCrystallinity, enthalpyOfCombustion, enthalpyOfCombustionErr, enthalpyOfFormation, enthalpyOfFormationErr, entropyOfFormation, entropyOfFormationErr, gibbsEnergyOfFormation, gibbsEnergyOfFormationErr, lnK, residualEntropyAt0K, residualEntropyAt0KErr, configurationalEntropy, configurationalEntropyErr, differenceOfZero, differenceOfZeroErr, T, Cp, HTH0, ST, GT) {
    console.log(agregateState)
    const agregateStateInput = document.getElementById('agregate_state');
    const numberPhaseInput = document.getElementById('number_phase');
    const degreeOfCrystallinityInput = document.getElementById('degree_of_crystallinity');
    const enthalpyOfCombustionInput = document.getElementById('enthalpy_of_combustion');
    const enthalpyOfCombustionErrInput = document.getElementById('enthalpy_of_combustion_err');
    const enthalpyOfFormationInput = document.getElementById('enthalpy_of_formation');
    const enthalpyOfFormationErrInput = document.getElementById('enthalpy_of_formation_err');
    const entropyOfFormationInput = document.getElementById('entropy_of_formation');
    const entropyOfFormationErrInput = document.getElementById('entropy_of_formation_err');
    const gibbsEnergyOfFormationInput = document.getElementById('gibbs_energy_of_formation');
    const gibbsEnergyOfFormationErrInput = document.getElementById('gibbs_energy_of_formation_err');
    const lnKInput = document.getElementById('lnK');
    const residualEntropyAt0KInput = document.getElementById('residual_entropy_at_0_k');
    const residualEntropyAt0KErrInput = document.getElementById('residual_entropy_at_0_k_err');
    const configurationalEntropyInput = document.getElementById('configurational_entropy');
    const configurationalEntropyErrInput = document.getElementById('configurational_entropy_err');
    const differenceOfZeroInput = document.getElementById('difference_of_zero');
    const differenceOfZeroErrInput = document.getElementById('difference_of_zero_err');
    const TInput = document.getElementById('T');
    const CpInput = document.getElementById('Cp');
    const HTH0Input = document.getElementById('HT_H0');
    const STInput = document.getElementById('ST');
    const GTInput = document.getElementById('GT');


    agregateStateInput.value = agregateState;
    numberPhaseInput.value = numberPhase;
    degreeOfCrystallinityInput.value = degreeOfCrystallinity;
    enthalpyOfCombustionInput.value = enthalpyOfCombustion;
    enthalpyOfCombustionErrInput.value = enthalpyOfCombustionErr;
    enthalpyOfFormationInput.value = enthalpyOfFormation;
    enthalpyOfFormationErrInput.value = enthalpyOfFormationErr;
    entropyOfFormationInput.value = entropyOfFormation;
    entropyOfFormationErrInput.value = entropyOfFormationErr;
    gibbsEnergyOfFormationInput.value = gibbsEnergyOfFormation;
    gibbsEnergyOfFormationErrInput.value = gibbsEnergyOfFormationErr;
    lnKInput.value = lnK;
    residualEntropyAt0KInput.value = residualEntropyAt0K;
    residualEntropyAt0KErrInput.value = residualEntropyAt0KErr;
    configurationalEntropyInput.value = configurationalEntropy;
    configurationalEntropyErrInput.value = configurationalEntropyErr;
    differenceOfZeroInput.value = differenceOfZero;
    differenceOfZeroErrInput.value = differenceOfZeroErr;
    TInput.value = T;
    CpInput.value = Cp;
    HTH0Input.value = HTH0;
    STInput.value = ST;
    GTInput.value = GT;
}

const propertiesListbox = document.getElementById('properties');
propertiesListbox.addEventListener('click', () => {
    selectedIndex = propertiesListbox.selectedIndex;
    if (selectedIndex !== -1) {
        const selectedProperty = propertiesList[selectedIndex];
        fillPropertyFields(

            selectedProperty.agregateState,
            selectedProperty.numberPhase,
            selectedProperty.degreeOfCrystallinity,
            selectedProperty.enthalpyOfCombustion,
            selectedProperty.enthalpyOfCombustionErr,
            selectedProperty.enthalpyOfFormation,
            selectedProperty.enthalpyOfFormationErr,
            selectedProperty.entropyOfFormation,
            selectedProperty.entropyOfFormationErr,
            selectedProperty.gibbsEnergyOfFormation,
            selectedProperty.gibbsEnergyOfFormationErr,
            selectedProperty.lnK,
            selectedProperty.residualEntropyAt0K,
            selectedProperty.residualEntropyAt0KErr,
            selectedProperty.configurationalEntropy,
            selectedProperty.configurationalEntropyErr,
            selectedProperty.differenceOfZero,
            selectedProperty.differenceOfZeroErr,
            selectedProperty.T,
            selectedProperty.Cp,
            selectedProperty.HTH0,
            selectedProperty.ST,
            selectedProperty.GT
        );
    }
});






   });

