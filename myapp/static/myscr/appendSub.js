

    // <!-- LITERATURE == ARTICLE -->

// Глобальная переменная для хранения данных о литературе
let literatureData = [];
var AggregateStateDicts =[];



function addArticle() {
    const articleName = document.getElementById('articleName').value;
    const articleLink = document.getElementById('articleLink').value;
    const doiNumber = document.getElementById('doiNumber').value;
    if (articleName && articleLink && doiNumber) {
        // Добавление данных в глобальную переменную
        const newArticle = {
            description: articleName,
            link: articleLink,
            doi: doiNumber
        };
        literatureData.push(newArticle);
        // Создание элемента списка и добавление его в listBox
        const li = document.createElement('li');
        li.textContent = `${articleName} - ${articleLink} - ${doiNumber}`;
        li.ondblclick = function() {
            editArticle(li);
        };
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.style.marginLeft = '10px';
        deleteButton.onclick = function() {
            li.remove();
            // Удаление данных из глобальной переменной при удалении из listBox
            literatureData = literatureData.filter(article => !(article.name === articleName && article.link === articleLink && article.doi === doiNumber));
        };
        li.appendChild(deleteButton);
        document.getElementById('articleList').appendChild(li);
        // Очистка полей ввода
        document.getElementById('articleName').value = '';
        document.getElementById('articleLink').value = '';
        document.getElementById('doiNumber').value = '';
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
}

function editArticle(li) {
    const [articleName, articleLink, doiNumber] = li.textContent.split(' - ');
    const newArticleName = prompt('Название статьи', articleName);
    const newArticleLink = prompt('Ссылка', articleLink);
    const newDoiNumber = prompt('DOI номер', doiNumber);
    if (newArticleName && newArticleLink && newDoiNumber) {
        // Обновление данных в глобальной переменной
        literatureData = literatureData.map(article => {
            if (article.name === articleName && article.link === articleLink && article.doi === doiNumber) {
                return {
                    name: newArticleName,
                    link: newArticleLink,
                    doi: newDoiNumber
                };
            }
            return article;
        });
        li.childNodes[0].nodeValue = `${newArticleName} - ${newArticleLink} - ${newDoiNumber}`;
    }
}


    // <!-- TRANSITION -->
          // Глобальная переменная для хранения данных о переходах
        let phaseTransitionsList = [];

        function addTransition() {
            const sourcePhase = document.getElementById('source_phase').value;
            const targetPhase = document.getElementById('target_phase').value;
            const sourcePhaseNumber = document.getElementById('source_phase').selectedIndex + 1;
            const targetPhaseNumber = document.getElementById('target_phase').selectedIndex + 1;
            const temperature = document.getElementById('temperature').value;
            const temperatureErr = document.getElementById('temperature_err').value;
            const enthalpyTransition = document.getElementById('enthalpy_transition').value;
            const enthalpyTransitionErr = document.getElementById('enthalpy_transition_err').value;
            const entropyTransition = document.getElementById('entropy_transition').value;
            const entropyTransitionErr = document.getElementById('entropy_transition_err').value;
            const jumpHeatCapacity = document.getElementById('jump_heat_capacity').value;
            const startTemperature = document.getElementById('start_temperature').value;
            const endTemperature = document.getElementById('end_temperature').value;

            if (sourcePhaseNumber && targetPhaseNumber && temperature) {
                // Добавление данных в глобальную переменную
                const newTransition = {
                    source_phase: sourcePhase,
                    target_phase: targetPhase,
                    source_phase_number: sourcePhaseNumber,
                    target_phase_number: targetPhaseNumber,
                    temperatureErr: temperatureErr,
                    enthalpyTransition: enthalpyTransition,
                    enthalpyTransitionErr: enthalpyTransitionErr,
                    entropyTransition: entropyTransition,
                    entropyTransitionErr: entropyTransitionErr,
                    jumpHeatCapacity: jumpHeatCapacity,
                    startTemperature: startTemperature,
                    endTemperature: endTemperature
                };
                phaseTransitionsList.push(newTransition);


                // Создание элемента списка и добавление его в listBox
                const li = document.createElement('li');
                li.textContent = `${sourcePhase} - ${targetPhase} - ${sourcePhaseNumber} - ${targetPhaseNumber} - ${temperature} - ${temperatureErr} - ${enthalpyTransition} - ${enthalpyTransitionErr} - ${entropyTransition} - ${entropyTransitionErr} - ${jumpHeatCapacity} - ${startTemperature} - ${endTemperature}`;
                li.ondblclick = function() {
                    editTransition(li);
                };
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Удалить';
                deleteButton.style.marginLeft = '10px';
                deleteButton.onclick = function() {
                    li.remove();
                    // Удаление данных из глобальной переменной при удалении из listBox
                    phaseTransitionsList = phaseTransitionsList.filter(transition => !(transition.sourcePhase === sourcePhase &&
                        transition.targetPhase === targetPhase &&
                        transition.sourcePhaseNumber === sourcePhaseNumber &&
                        transition.targetPhaseNumber === targetPhaseNumber &&
                        transition.temperature === temperature &&
                        transition.temperatureErr === temperatureErr &&
                        transition.enthalpyTransition === enthalpyTransition &&
                        transition.enthalpyTransitionErr === enthalpyTransitionErr &&
                        transition.entropyTransition === entropyTransition &&
                        transition.entropyTransitionErr === entropyTransitionErr &&
                        transition.jumpHeatCapacity === jumpHeatCapacity &&
                        transition.startTemperature === startTemperature &&
                        transition.endTemperature === endTemperature));
                };
                li.appendChild(deleteButton);
                document.getElementById('transitionList').appendChild(li);
                // Очистка полей ввода
                document.getElementById('source_phase').value = '';
                document.getElementById('target_phase').value = '';
                document.getElementById('source_phase_number').value = '';
                document.getElementById('target_phase_number').value = '';
                document.getElementById('temperature').value = '';
                document.getElementById('temperature_err').value = '';
                document.getElementById('enthalpy_transition').value = '';
                document.getElementById('enthalpy_transition_err').value = '';
                document.getElementById('entropy_transition').value = '';
                document.getElementById('entropy_transition_err').value = '';
                document.getElementById('jump_heat_capacity').value = '';
                document.getElementById('start_temperature').value = '';
                document.getElementById('end_temperature').value = '';
            } else {
                alert('Пожалуйста, заполните обязательные поля: номер исходной фазы, номер конечной фазы и температура.');
            }
        }

        function editTransition(li) {
            const [sourcePhase, targetPhase, sourcePhaseNumber, targetPhaseNumber, temperature, temperatureErr, enthalpyTransition, enthalpyTransitionErr, entropyTransition, entropyTransitionErr, jumpHeatCapacity, startTemperature, endTemperature] = li.textContent.split(' - ');
            const newSourcePhase = prompt('Исходная фаза', sourcePhase);
            const newTargetPhase = prompt('Конечная фаза', targetPhase);
            const newSourcePhaseNumber = prompt('Номер исходной фазы', sourcePhaseNumber);
            const newTargetPhaseNumber = prompt('Номер конечной фазы', targetPhaseNumber);
            const newTemperature = prompt('Температура', temperature);
            const newTemperatureErr = prompt('Ошибка температуры', temperatureErr);
            const newEnthalpyTransition = prompt('Энтальпия перехода', enthalpyTransition);
            const newEnthalpyTransitionErr = prompt('Ошибка энтальпии перехода', enthalpyTransitionErr);
            const newEntropyTransition = prompt('Энтропия перехода', entropyTransition);
            const newEntropyTransitionErr = prompt('Ошибка энтропии перехода', entropyTransitionErr);
            const newJumpHeatCapacity = prompt('Скачок теплоемкости', jumpHeatCapacity);
            const newStartTemperature = prompt('Начальная температура', startTemperature);
            const newEndTemperature = prompt('Конечная температура', endTemperature);

            if (newSourcePhase && newTargetPhase && newSourcePhaseNumber && newTargetPhaseNumber && newTemperature) {
                // Обновление данных в глобальной переменной
                transitionDataList = transitionDataList.map(transition => {
                    if (transition.sourcePhase === sourcePhase &&
                        transition.targetPhase === targetPhase &&
                        transition.sourcePhaseNumber === sourcePhaseNumber &&
                        transition.targetPhaseNumber === targetPhaseNumber &&
                        transition.temperature === temperature &&
                        transition.temperatureErr === temperatureErr &&
                        transition.enthalpyTransition === enthalpyTransition &&
                        transition.enthalpyTransitionErr === enthalpyTransitionErr &&
                        transition.entropyTransition === entropyTransition &&
                        transition.entropyTransitionErr === entropyTransitionErr &&
                        transition.jumpHeatCapacity === jumpHeatCapacity &&
                        transition.startTemperature === startTemperature &&
                        transition.endTemperature === endTemperature) {
                        return {
                            sourcePhase: newSourcePhase,
                            targetPhase: newTargetPhase,
                            sourcePhaseNumber: newSourcePhaseNumber,
                            targetPhaseNumber: newTargetPhaseNumber,
                            temperature: newTemperature,
                            temperatureErr: newTemperatureErr,
                            enthalpyTransition: newEnthalpyTransition,
                            enthalpyTransitionErr: newEnthalpyTransitionErr,
                            entropyTransition: newEntropyTransition,
                            entropyTransitionErr: newEntropyTransitionErr,
                            jumpHeatCapacity: newJumpHeatCapacity,
                            startTemperature: newStartTemperature,
                            endTemperature: newEndTemperature
                        };
                    }
                    return transition;
                });
                li.childNodes[0].nodeValue = `${newSourcePhase} - ${newTargetPhase} - ${newSourcePhaseNumber} - ${newTargetPhaseNumber} - ${newTemperature} - ${newTemperatureErr} - ${newEnthalpyTransition} - ${newEnthalpyTransitionErr} - ${newEntropyTransition} - ${newEntropyTransitionErr} - ${newJumpHeatCapacity} - ${newStartTemperature} - ${newEndTemperature}`;
            }
        }

    // <!-- STATE -->

// Глобальная переменная для хранения данных о переходах
let stateData = [];

function addState() {
    const stateName = document.getElementById('stateName').value;
    const stateNumber = document.getElementById('stateNumber').selectedIndex + 1;
    const degreeOfCrystallinity = document.getElementById('degree_of_crystallinity').value;
    const enthalpyOfCombustion = document.getElementById('enthalpy_of_combustion').value;
    const enthalpyOfCombustionErr = document.getElementById('enthalpy_of_combustion_err').value;
    const enthalpyOfFormation = document.getElementById('enthalpy_of_formation').value;
    const enthalpyOfFormationErr = document.getElementById('enthalpy_of_formation_err').value;
    const entropyOfFormation = document.getElementById('entropy_of_formation').value;
    const entropyOfFormationErr = document.getElementById('entropy_of_formation_err').value;
    const gibbsEnergyOfFormation = document.getElementById('gibbs_energy_of_formation').value;
    const gibbsEnergyOfFormationErr = document.getElementById('gibbs_energy_of_formation_err').value;
    const lnK = document.getElementById('lnK').value;
    const residualEntropyAt0K = document.getElementById('residual_entropy_at_0_k').value;
    const residualEntropyAt0KErr = document.getElementById('residual_entropy_at_0_k_err').value;
    const configurationalEntropy = document.getElementById('configurational_entropy').value;
    const configurationalEntropyErr = document.getElementById('configurational_entropy_err').value;
    const differenceOfZero = document.getElementById('difference_of_zero').value;
    const differenceOfZeroErr = document.getElementById('difference_of_zero_err').value;

    if (stateName && stateNumber) {
        const newState = {
            agregate_state: stateName,
            number_phase: stateNumber,
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
            differenceOfZeroErr: differenceOfZeroErr
        };
        stateData.push(newState);

        const li = document.createElement('li');
        li.textContent = `${stateName} - ${stateNumber} - ${degreeOfCrystallinity} - ${enthalpyOfCombustion} - ${enthalpyOfCombustionErr} - ${enthalpyOfFormation} - ${enthalpyOfFormationErr} - ${entropyOfFormation} - ${entropyOfFormationErr} - ${gibbsEnergyOfFormation} - ${gibbsEnergyOfFormationErr} - ${lnK} - ${residualEntropyAt0K} - ${residualEntropyAt0KErr} - ${configurationalEntropy} - ${configurationalEntropyErr} - ${differenceOfZero} - ${differenceOfZeroErr}`;
        li.ondblclick = function() {
            editState(li);
        };
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.style.marginLeft = '10px';
        deleteButton.onclick = function() {
            li.remove();
            stateData = stateData.filter(state => !(state.name === stateName && state.number === stateNumber));
        };
        li.appendChild(deleteButton);
        document.getElementById('stateList').appendChild(li);

        document.getElementById('stateName').value = '';
        document.getElementById('stateNumber').value = '';
        document.getElementById('degree_of_crystallinity').value = '';
        document.getElementById('enthalpy_of_combustion').value = '';
        document.getElementById('enthalpy_of_combustion_err').value = '';
        document.getElementById('enthalpy_of_formation').value = '';
        document.getElementById('enthalpy_of_formation_err').value = '';
        document.getElementById('entropy_of_formation').value = '';
        document.getElementById('entropy_of_formation_err').value = '';
        document.getElementById('gibbs_energy_of_formation').value = '';
        document.getElementById('gibbs_energy_of_formation_err').value = '';
        document.getElementById('lnK').value = '';
        document.getElementById('residual_entropy_at_0_k').value = '';
        document.getElementById('residual_entropy_at_0_k_err').value = '';
        document.getElementById('configurational_entropy').value = '';
        document.getElementById('configurational_entropy_err').value = '';
        document.getElementById('difference_of_zero').value = '';
        document.getElementById('difference_of_zero_err').value = '';
    } else {
        alert('Пожалуйста, заполните поля "Название агрегатного состояния" и "Номер агрегатного состояния".');
    }
}

function editState(li) {
    const data = li.textContent.split(' - ');
    const stateName = data[0];
    const stateNumber = data[1];
    const degreeOfCrystallinity = data[2];
    const enthalpyOfCombustion = data[3];
    const enthalpyOfCombustionErr = data[4];
    const enthalpyOfFormation = data[5];
    const enthalpyOfFormationErr = data[6];
    const entropyOfFormation = data[7];
    const entropyOfFormationErr = data[8];
    const gibbsEnergyOfFormation = data[9];
    const gibbsEnergyOfFormationErr = data[10];
    const lnK = data[11];
    const residualEntropyAt0K = data[12];
    const residualEntropyAt0KErr = data[13];
    const configurationalEntropy = data[14];
    const configurationalEntropyErr = data[15];
    const differenceOfZero = data[16];
    const differenceOfZeroErr = data[17];

    const newStateName = prompt('Название агрегатного состояния', stateName);
    const newStateNumber = prompt('Номер агрегатного состояния', stateNumber);
    const newDegreeOfCrystallinity = prompt('Degree of Crystallinity', degreeOfCrystallinity);
    const newEnthalpyOfCombustion = prompt('Enthalpy of Combustion', enthalpyOfCombustion);
    const newEnthalpyOfCombustionErr = prompt('Enthalpy of Combustion Error', enthalpyOfCombustionErr);
    const newEnthalpyOfFormation = prompt('Enthalpy of Formation', enthalpyOfFormation);
    const newEnthalpyOfFormationErr = prompt('Enthalpy of Formation Error', enthalpyOfFormationErr);
    const newEntropyOfFormation = prompt('Entropy of Formation', entropyOfFormation);
    const newEntropyOfFormationErr = prompt('Entropy of Formation Error', entropyOfFormationErr);
    const newGibbsEnergyOfFormation = prompt('Gibbs Energy of Formation', gibbsEnergyOfFormation);
    const newGibbsEnergyOfFormationErr = prompt('Gibbs Energy of Formation Error', gibbsEnergyOfFormationErr);
    const newLnK = prompt('lnK', lnK);
    const newResidualEntropyAt0K = prompt('Residual Entropy at 0 K', residualEntropyAt0K);
    const newResidualEntropyAt0KErr = prompt('Residual Entropy at 0 K Error', residualEntropyAt0KErr);
    const newConfigurationalEntropy = prompt('Configurational Entropy', configurationalEntropy);
    const newConfigurationalEntropyErr = prompt('Configurational Entropy Error', configurationalEntropyErr);
    const newDifferenceOfZero = prompt('Difference of Zero', differenceOfZero);
    const newDifferenceOfZeroErr = prompt('Difference of Zero Error', differenceOfZeroErr);

    if (newStateName && newStateNumber) {
        stateData = stateData.map(state => {
            if (state.name === stateName && state.number === stateNumber) {
                return {
                    name: newStateName,
                    number: newStateNumber,
                    degreeOfCrystallinity: newDegreeOfCrystallinity,
                    enthalpyOfCombustion: newEnthalpyOfCombustion,
                    enthalpyOfCombustionErr: newEnthalpyOfCombustionErr,
                    enthalpyOfFormation: newEnthalpyOfFormation,
                    enthalpyOfFormationErr: newEnthalpyOfFormationErr,
                    entropyOfFormation: newEntropyOfFormation,
                    entropyOfFormationErr: newEntropyOfFormationErr,
                    gibbsEnergyOfFormation: newGibbsEnergyOfFormation,
                    gibbsEnergyOfFormationErr: newGibbsEnergyOfFormationErr,
                    lnK: newLnK,
                    residualEntropyAt0K: newResidualEntropyAt0K,
                    residualEntropyAt0KErr: newResidualEntropyAt0KErr,
                    configurationalEntropy: newConfigurationalEntropy,
                    configurationalEntropyErr: newConfigurationalEntropyErr,
                    differenceOfZero: newDifferenceOfZero,
                    differenceOfZeroErr: newDifferenceOfZeroErr
                };
            }
            return state;
        });
        li.childNodes[0].nodeValue = `${newStateName} - ${newStateNumber} - ${newDegreeOfCrystallinity} - ${newEnthalpyOfCombustion} - ${newEnthalpyOfCombustionErr} - ${newEnthalpyOfFormation} - ${newEnthalpyOfFormationErr} - ${newEntropyOfFormation} - ${newEntropyOfFormationErr} - ${newGibbsEnergyOfFormation} - ${newGibbsEnergyOfFormationErr} - ${newLnK} - ${newResidualEntropyAt0K} - ${newResidualEntropyAt0KErr} - ${newConfigurationalEntropy} - ${newConfigurationalEntropyErr} - ${newDifferenceOfZero} - ${newDifferenceOfZeroErr}`;
    }
}



    // <!-- JEXCEL -->

// Инициализация jExcel таблицы
/*
document.addEventListener('DOMContentLoaded', function() {
    jspreadsheet(document.getElementById('spreadsheet'), {
        data: [
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
        ],
        columns: [{
            type: 'text',
            title: 'T',
            width: 120
        }, {
            type: 'text',
            title: 'Cp',
            width: 120
        }, {
            type: 'text',
            title: 'H',
            width: 120
        }, {
            type: 'text',
            title: 'S',
            width: 120
        }, {
            type: 'text',
            title: 'G',
            width: 120
        }],
        minDimensions: [5, 5]
    });
});
*/

    // <!-- SEND_DATA_TO_DATA_BASE -->

async function sendData() {
    // Инициализация переменных для тестов
            const name = document.getElementById('substanceName').value;
            const cas = document.getElementById('casNumber').value;
            const formula = document.getElementById('formula').value;
            const substanceClass = document.getElementById('class').value;
            const substanceType = document.getElementById('type').value;
            const source = document.getElementById('substanceSource').value;


    console.log(phaseTransitionsList);
    const data = {
        substance_class: substanceClass,
        substance_type: substanceType,
        name: name,
        formula: formula,
        cas: cas,
        source: source,
        literature: literatureData,
        AggregateState: stateData,
        transactions_list: phaseTransitionsList,
    };
    console.log("Data to be sent:", JSON.stringify(data)); // Логирование данных
    try {
        const response = await fetch("/api/append/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            alert("Данные успешно отправлены");
        } else {
            const errorData = await response.json();
            console.error("Ошибка при отправке данных:", errorData);
            alert("Ошибка при отправке данных");
        }
    } catch (error) {
        console.error("Ошибка:", error);
        alert("Ошибка при отправке данных");
    }
}

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



//             JV  code
//Необходимо реализовать добавление
// агрегатных состояний и фазовых переходов в множество (аналогично литературе);

function ConsF(){
    console.log("something");
    let tempr_per = transitionDataList.map(elem => parseFloat(elem["temperature"]));
    let tem_flag =0;
    let alch = document.getElementById("AggregateStateCont").querySelectorAll('select, input');
    AggregateStateDict = {};
    
    alch.forEach(function(element) {
        if (element.id=="stateName") {
            AggregateStateDict["agregate_state"] = element.value||"";
            AggregateStateDict["state"]=parseInt(element.selectedIndex);
            return;
        }
        if (element.id=="stateNumber") {
            AggregateStateDict["number_phase"]=parseInt(element.selectedIndex)+1;
            return;
        }
        AggregateStateDict[element.id] = parseFloat(element.value)||0;
        //if (element.tagName=="SELECT")  AggregateStateDict[element.id] = parseInt(element.selectedIndex);
    });
    let tblsel = document.getElementById("spreadsheet");
    let temcol_data = parseInt(tblsel.querySelector('[title="T"]').getAttribute('data-x'));
    let n = tblsel.childNodes.length;
    tblsel =Array.from(tblsel.querySelectorAll("tr"));
    let b=0, e=0;
    AggregateStateDict["T"] =[];
    AggregateStateDict["Cp"] = [];
    AggregateStateDict["HT_H0"] = [];
    AggregateStateDict["ST"] =[];
    AggregateStateDict["GT"] = [];
    for (let t of tblsel.map(element=>element.childNodes[1+temcol_data].textContent)) {
        if ((parseFloat(t)||-1) >=tempr_per[tem_flag])  {  //тут включительно!!!
            for (let i=1; i<n+1;i++ ){;
                let td = tblsel.map(element=>element.childNodes[i].textContent);
                if (td[0]=="T") AggregateStateDict["T"] = td.slice(b+(b==0),e).map(element=>parseFloat(element)||0);
                if (td[0]=="Cp") AggregateStateDict["Cp"] = td.slice(b+(b==0),e).map(element=>parseFloat(element)||0);
                if (td[0]=="H") AggregateStateDict["HT_H0"] = td.slice(+(b==0),e).map(element=>parseFloat(element)||0);
                if (td[0]=="S") AggregateStateDict["ST"] = td.slice(b+(b==0),e).map(element=>parseFloat(element)||0);
                if (td[0]=="G") AggregateStateDict["GT"] = td.slice(b+(b==0),e).map(element=>parseFloat(element)||0);
            }
            if (b!=e){
                //где-то тут ОШИБКА!!!!
            AggregateStateDict["agregate_state"] = (transitionDataList[tem_flag])["sourcePhase"]||"";
            AggregateStateDict["state"]=parseInt((transitionDataList[tem_flag])["sourcePhase"]);
            AggregateStateDict["number_phase"] = parseInt((transitionDataList[tem_flag])["sourcePhaseNumber"])
            AggregateStateDicts.push(AggregateStateDict);
            console.log(AggregateStateDicts, "djskdskdfs");
            }
            tem_flag++;
            b=e;
        }
        e++;
    }
    console.log(AggregateStateDict);
    if (b!=e) AggregateStateDicts.push(AggregateStateDict);
    console.log(transitionDataList, "!!!!!!!!!!!!");
    console.log(tempr_per, "!!!!!!!!!!!!");
    console.log( "!!!!!!!!!!!!");
}




//------



