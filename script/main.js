window.addEventListener("load", main);

// Globally used state
state = {
    todoDictionary: [],
    local_id: undefined,
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
    prevSelected: undefined
}

// Start of program
async function main() {
    initWelcomeSegment()
    await tryFetchCalenderInfo()
    loadLocalStorage();
    initTodoList(state.local_id);
    addEventListeners();
    createCalender();
}