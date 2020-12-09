// keyboard buttons
export const isMenu = {
    PriceList: 'Price list',
    BarberList: 'Barber list',
    Profile: 'My profile',
    RemoveAppointment: 'Remove my appointment',
    Back: 'Back',
    SignUpForAnAppointment: 'Sign up for an appointment',
    Help: 'Help',
};

export const isProfile = {
    History: 'Appointments history',
    Booked: 'Booked appointments',
    Edit: 'Edit',
};

// keyboards
const menuKeyboard = [
    [isMenu.PriceList, isMenu.BarberList],
    [isMenu.SignUpForAnAppointment, isMenu.Help],
    [isMenu.Profile],
];

const profileKeyboard = [
    [isProfile.History, isProfile.Booked],
    [isMenu.Help, isMenu.Back],
];

// keyboard-constructor
function reply(arg: string[][]) {
    return {
        reply_markup: JSON.stringify({
            resize_keyboard: true,
            keyboard: arg,
        }),
    };
}

export const menu = reply(menuKeyboard);
export const profile = reply(profileKeyboard);
