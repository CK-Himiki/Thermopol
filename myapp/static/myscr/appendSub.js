

    // <!-- LITERATURE == ARTICLE -->

// Глобальная переменная для хранения данных о литературе
let literatureData = [];

function addArticle() {
    const articleName = document.getElementById('articleName').value;
    const articleLink = document.getElementById('articleLink').value;
    const doiNumber = document.getElementById('doiNumber').value;
    if (articleName && articleLink && doiNumber) {
        // Добавление данных в глобальную переменную
        const newArticle = {
            name: articleName,
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

function addTransition() {
    const sourcePhase = document.getElementById('source_phase').value;
    const targetPhase = document.getElementById('target_phase').value;
    const sourcePhaseNumber = document.getElementById('source_phase_number').value;
    const targetPhaseNumber = document.getElementById('target_phase_number').value;
    const temperature = document.getElementById('temperature').value;
    const temperatureErr = document.getElementById('temperature_err').value;
    const enthalpyTransition = document.getElementById('enthalpy_transition').value;
    const enthalpyTransitionErr = document.getElementById('enthalpy_transition_err').value;
    const entropyTransition = document.getElementById('entropy_transition').value;
    const entropyTransitionErr = document.getElementById('entropy_transition_err').value;
    const jumpHeatCapacity = document.getElementById('jump_heat_capacity').value;
    const startTemperature = document.getElementById('start_temperature').value;
    const endTemperature = document.getElementById('end_temperature').value;
    const li = document.createElement('li');
    let transitionData = '';
    if (sourcePhase) transitionData += `${sourcePhase} - `;
    if (targetPhase) transitionData += `${targetPhase} - `;
    if (sourcePhaseNumber) transitionData += `${sourcePhaseNumber} - `;
    if (targetPhaseNumber) transitionData += `${targetPhaseNumber} - `;
    if (temperature) transitionData += `${temperature} - `;
    if (temperatureErr) transitionData += `${temperatureErr} - `;
    if (enthalpyTransition) transitionData += `${enthalpyTransition} - `;
    if (enthalpyTransitionErr) transitionData += `${enthalpyTransitionErr} - `;
    if (entropyTransition) transitionData += `${entropyTransition} - `;
    if (entropyTransitionErr) transitionData += `${entropyTransitionErr} - `;
    if (jumpHeatCapacity) transitionData += `${jumpHeatCapacity} - `;
    if (startTemperature) transitionData += `${startTemperature} - `;
    if (endTemperature) transitionData += `${endTemperature}`;
    if (transitionData) {
        li.textContent = transitionData.trim();
        li.ondblclick = function() {
            editTransition(li);
        };
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.style.marginLeft = '10px';
        deleteButton.onclick = function() {
            li.remove();
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
        alert('Пожалуйста, заполните хотя бы одно поле.');
    }
}


    // <!-- STATE -->

function addState() {
    const stateName = document.getElementById('stateName').value;
    const stateNumber = document.getElementById('stateNumber').value;
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
        };
        li.appendChild(deleteButton);
        document.getElementById('stateList').appendChild(li);
        // Очистка полей ввода
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
        li.childNodes[0].nodeValue = `${newStateName} - ${newStateNumber} - ${newDegreeOfCrystallinity} - ${newEnthalpyOfCombustion} - ${newEnthalpyOfCombustionErr} - ${newEnthalpyOfFormation} - ${newEnthalpyOfFormationErr} - ${newEntropyOfFormation} - ${newEntropyOfFormationErr} - ${newGibbsEnergyOfFormation} - ${newGibbsEnergyOfFormationErr} - ${newLnK} - ${newResidualEntropyAt0K} - ${newResidualEntropyAt0KErr} - ${newConfigurationalEntropy} - ${newConfigurationalEntropyErr} - ${newDifferenceOfZero} - ${newDifferenceOfZeroErr}`;
    }
}


    // <!-- JEXCEL -->

// Инициализация jExcel таблицы
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


    // <!-- SEND_DATA_TO_DATA_BASE -->

async function sendData() {
    // Инициализация переменных для тестов
    const substanceClass = "Гели"; // Замените на тестовое значение
    const substanceType = "Олигомер"; // Замените на тестовое значение
    const name = "name_value"; // Замените на тестовое значение
    const formula = "formula_value"; // Замените на тестовое значение
    const source = "source_value"; // Замените на тестовое значение
    const cas = "123"; // Замените на тестовое значение
    const literatureList = [{
        description: "description1",
        url: "http://example1.com",
        doi: "123"
    }, {
        description: "description2",
        url: "http://example1.com",
        doi: "123456789"
    }, ]; // Пример тестовых данных для literatureList
    const AggregateStatesList = [{
        "state": 0,
        "agregate_state": "Glass",
        "number_phase": 6,
        "degree_of_crystallinity": 0.5,
        "enthalpy_of_combustion": 100.0,
        "enthalpy_of_combustion_err": 0.1,
        "enthalpy_of_formation": 50.0,
        "enthalpy_of_formation_err": 0.05,
        "entropy_of_formation": 10.0,
        "entropy_of_formation_err": 0.01,
        "gibbs_energy_of_formation": -20.0,
        "gibbs_energy_of_formation_err": 0.02,
        "lnK": 0.5,
        "residual_entropy_at_0_k": 1.0,
        "residual_entropy_at_0_k_err": 0.01,
        "configurational_entropy": 5.0,
        "configurational_entropy_err": 0.05,
        "difference_of_zero": 0.1,
        "difference_of_zero_err": 0.01,
        "T": [300, 310, 320],
        "Cp": [1.0, 1.1, 1.2],
        "HT_H0": [0.1, 0.2, 0.3],
        "ST": [0.01, 0.02, 0.03],
        "GT": [0.001, 0.002, 0.003]
    }];
    const phaseTransitionsList = [{
        "transition": 1,
        "source_phase": "Glass",
        "target_phase": "Glass",
        "source_phase_number": 1,
        "target_phase_number": 2,
        "temperature": 100,
        "temperature_err": 1,
        "enthalpy_transition": 50,
        "enthalpy_transition_err": 2,
        "entropy_transition": 30,
        "entropy_transition_err": 1,
        "jump_heat_capacity": 10,
        "start_temperature": 0,
        "end_temperature": 100
    }];
    const data = {
        substance_class: substanceClass,
        substance_type: substanceType,
        name: name,
        formula: formula,
        cas: cas,
        source: source,
        literature: literatureList,
        AggregateState: AggregateStatesList,
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
