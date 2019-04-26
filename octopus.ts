/****************************************************************/
/*   ELECFREAKS octopus Series               		            */
/*   More information please visit https://wwww.elecfreaks.com	*/
/*   Code by Lionkk												*/
/****************************************************************/


//% weight=100 color=#fc8715  icon="\uf1e6" block="octopus"
//% groups='["8*16Matrix","DigitalPin","AnalogPin","IIC Interface","RTC1307","DoublePin"]'
namespace octopus_output {
    /************************************************************Value********************************************************/
    let initialized = false
    let initializedMatrix = false
    let matBuf = pins.createBuffer(17)
    const PCA9685_ADDRESS = 0x40
    const MODE1 = 0x00
    const PRESCALE = 0xFE
    const LED0_ON_L = 0x06
    // HT16K33 commands
    const HT16K33_ADDRESS = 0x70
    const HT16K33_BLINK_CMD = 0x80
    const HT16K33_BLINK_DISPLAYON = 0x01
    const HT16K33_BLINK_OFF = 0
    const HT16K33_BLINK_2HZ = 1
    const HT16K33_BLINK_1HZ = 2
    const HT16K33_BLINK_HALFHZ = 3
    const HT16K33_CMD_BRIGHTNESS = 0xE0
    //BME280
    let BME280_I2C_ADDR = 0x76
    let dig_T1 = getUInt16LE(0x88)
    let dig_T2 = getInt16LE(0x8A)
    let dig_T3 = getInt16LE(0x8C)
    let dig_P1 = getUInt16LE(0x8E)
    let dig_P2 = getInt16LE(0x90)
    let dig_P3 = getInt16LE(0x92)
    let dig_P4 = getInt16LE(0x94)
    let dig_P5 = getInt16LE(0x96)
    let dig_P6 = getInt16LE(0x98)
    let dig_P7 = getInt16LE(0x9A)
    let dig_P8 = getInt16LE(0x9C)
    let dig_P9 = getInt16LE(0x9E)
    let dig_H1 = getreg(0xA1)
    let dig_H2 = getInt16LE(0xE1)
    let dig_H3 = getreg(0xE3)
    let a = getreg(0xE5)
    let dig_H4 = (getreg(0xE4) << 4) + (a % 16)
    let dig_H5 = (getreg(0xE6) << 4) + (a >> 4)
    let dig_H6 = getInt8LE(0xE7)
    let T = 0
    let P = 0
    let H = 0
    setreg(0xF2, 0x04)
    setreg(0xF4, 0x2F)
    setreg(0xF5, 0x0C)
    setreg(0xF4, 0x2F)
    //DS1307RTC
    let DS1307_I2C_ADDR = 0x68;
    let DS1307_REG_SECOND = 0
    let DS1307_REG_MINUTE = 1
    let DS1307_REG_HOUR = 2
    let DS1307_REG_WEEKDAY = 3
    let DS1307_REG_DAY = 4
    let DS1307_REG_MONTH = 5
    let DS1307_REG_YEAR = 6
    let DS1307_REG_CTRL = 7
    let DS1307_REG_RAM = 8
    /*******************************************************************************************************************/


    /***************************************************listStyleType***************************************************/
    export enum Relay_state {
        //% block="NC:open|NO:close" enumval=0
        state0,
        //% block="NC:close|NO:open" enumval=1
        state1
    }
    export enum Button_state {
        //% block="pressed" enumval=0
        pressed,
        //% block="unpressed" enumval=1
        unpressed
    }
    export enum ADKeyPad_state {
        //% block="A" enumval=0
        A,
        //% block="B" enumval=1
        B,
        //% block="C" enumval=2
        C,
        //% block="D" enumval=3
        D,
        //% block="E" enumval=4
        E
    }
    export enum Vibration_Motor_state {
        //% block="once" enumval=0
        Once,
        //% block="Always" enumval=1
        Always,
        //% block="none" enumval=2
        None
    }
    export enum BME280_state {
        //% block="Temperature(℃)" enumval=0
        Temperature,
        //% block="Humidity(RH)" enumval=1
        Humidity,
        //% block="Pressure(Pa)" enumval=2
        Pressure,
        //% block="Altitude(M)" enumval=3
        Altitude
    }
    export enum Distance_Unit_state {
        //% block="mm" enumval=0
        Distance_Unit_mm,
        //% block="cm" enumval=1
        Distance_Unit_cm,
        //% block="inch" enumval=2
        Distance_Unit_inch
    }
    export enum Tracking_state {
        //% block="● ●" enumval=0
        Tracking_State_0,
        //% block="◌ ●" enumval=1
        Tracking_State_1,
        //% block="● ◌" enumval=2
        Tracking_State_2,
        //% block="◌ ◌" enumval=3
        Tracking_State_3
    }
    export enum Tilt_Sensor_state {
        //% block="Left" enumval=0
        pressed,
        //% block="Right" enumval=1
        unpressed
    }
    export enum TimeType_state {
        //% block="second" enumval=0
        SECOND,
        //% block="minute" enumval=1
        MINUTE,
        //% block="hour" enumval=2
        HOUR,
        //% block="day" enumval=3
        DAY,
        //% block="month" enumval=4
        MONTH,
        //% block="year" enumval=5
        YEAR
    }
    export enum Photo_Sensor_state {
        //% block="◌" enumval=0
        Tracking_State_0,
        //% block="●" enumval=1
        Tracking_State_1
    }
    export enum Vibration_Sensor_state {
        //% block="vibrate" enumval=0
        vibrate,
        //% block="static" enumval=1
        static
    }
    export enum DHT11_state {
        //% block="temperature(℃)" enumval=0
        DHT11_temperature_C,
        //% block="temperature(℉)" enumval=1
        DHT11_temperature_F,
        //% block="humidity(RH)" enumval=2
        DHT11_humidity
    }
	export enum PIR_state{
		//% block="animal|human" enumval=0
        human,
        //% block="none" enumval=1
        none
	}
	export enum tmp36_state {
    //% block="(℃)" enumval=0
    temperature_C,
    //% block="(℉)" enumval=1
    temperature_F,
}


    /***************************************************************************************************************/


    /****************************************************************Function***************************************/
    ///////////////IIC8*16Matrix
    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(PCA9685_ADDRESS, MODE1, 0x00)
        setFreq(50);
        for (let idx = 0; idx < 16; idx++) {
            setPwm(idx, 0, 0);
        }
        initialized = true
    }
    function matrixInit() {
        i2ccmd(HT16K33_ADDRESS, 0x21);// turn on oscillator
        i2ccmd(HT16K33_ADDRESS, HT16K33_BLINK_CMD | HT16K33_BLINK_DISPLAYON | (0 << 1));
        i2ccmd(HT16K33_ADDRESS, HT16K33_CMD_BRIGHTNESS | 0xF);
    }

    function matrixShow() {
        matBuf[0] = 0x00;
        pins.i2cWriteBuffer(HT16K33_ADDRESS, matBuf);
    }
    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADDRESS, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADDRESS, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADDRESS, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        //serial.writeValue("ch", channel)
        //serial.writeValue("on", on)
        //serial.writeValue("off", off)

        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf);
    }
    ////////////////////////////////bme280
    function setreg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(BME280_I2C_ADDR, buf);
    }

    function getreg(reg: number): number {
        pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.UInt8BE);
    }

    function getInt8LE(reg: number): number {
        pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.Int8LE);
    }

    function getUInt16LE(reg: number): number {
        pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.UInt16LE);
    }

    function getInt16LE(reg: number): number {
        pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.Int16LE);
    }
    function get(): void {
        let adc_T = (getreg(0xFA) << 12) + (getreg(0xFB) << 4) + (getreg(0xFC) >> 4)
        let var1 = (((adc_T >> 3) - (dig_T1 << 1)) * dig_T2) >> 11
        let var2 = (((((adc_T >> 4) - dig_T1) * ((adc_T >> 4) - dig_T1)) >> 12) * dig_T3) >> 14
        let t = var1 + var2
        T = ((t * 5 + 128) >> 8) / 100
        var1 = (t >> 1) - 64000
        var2 = (((var1 >> 2) * (var1 >> 2)) >> 11) * dig_P6
        var2 = var2 + ((var1 * dig_P5) << 1)
        var2 = (var2 >> 2) + (dig_P4 << 16)
        var1 = (((dig_P3 * ((var1 >> 2) * (var1 >> 2)) >> 13) >> 3) + (((dig_P2) * var1) >> 1)) >> 18
        var1 = ((32768 + var1) * dig_P1) >> 15
        if (var1 == 0)
            return; // avoid exception caused by division by zero
        let adc_P = (getreg(0xF7) << 12) + (getreg(0xF8) << 4) + (getreg(0xF9) >> 4)
        let _p = ((1048576 - adc_P) - (var2 >> 12)) * 3125
        _p = (_p / var1) * 2;
        var1 = (dig_P9 * (((_p >> 3) * (_p >> 3)) >> 13)) >> 12
        var2 = (((_p >> 2)) * dig_P8) >> 13
        P = _p + ((var1 + var2 + dig_P7) >> 4)
        let adc_H = (getreg(0xFD) << 8) + getreg(0xFE)
        var1 = t - 76800
        var2 = (((adc_H << 14) - (dig_H4 << 20) - (dig_H5 * var1)) + 16384) >> 15
        var1 = var2 * (((((((var1 * dig_H6) >> 10) * (((var1 * dig_H3) >> 11) + 32768)) >> 10) + 2097152) * dig_H2 + 8192) >> 14)
        var2 = var1 - (((((var1 >> 15) * (var1 >> 15)) >> 7) * dig_H1) >> 4)
        if (var2 < 0) var2 = 0
        if (var2 > 419430400) var2 = 419430400
        H = (var2 >> 12) / 1024
    }
    ///////////////////////////rtc1307
    function RTC_setReg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(DS1307_I2C_ADDR, buf);
    }
    function RTC_getReg(reg: number): number {
        pins.i2cWriteNumber(DS1307_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(DS1307_I2C_ADDR, NumberFormat.UInt8BE);
    }
    function HexToDec(dat: number): number {
        return (dat >> 4) * 10 + (dat % 16);
    }
    function DecToHex(dat: number): number {
        return Math.idiv(dat, 10) * 16 + (dat % 10)
    }



    /*********************************************************************************************************************************/


    /****************************************************************Blockcode******************************************************/
    /*******************Input*****************/
    //% block="Button connects to %pin Status is %state"
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=2
    //% subcategory="Input"
    //% group=DigitalPin
    export function octopus_Button(pin: DigitalPin, state: Button_state): boolean {
        switch (state) {
            case 0:
                if (pins.digitalReadPin(pin) == 0) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 1:
                if (pins.digitalReadPin(pin) == 1) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            default:
                return false
        }
    }
    //% block="Read Analog Rotation value to %pin"
    //% subcategory="Input"
    //% group=AnalogPin
    export function octopus_Rotation(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }
    //% block="Read Black Analog Rotation value to %pin"
    //% subcategory="Input"
    //% group=AnalogPin
    export function octopus_Rotation_Black(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }
    //% block="Read Linear Slider Potentiometer value to %pin"
    //% subcategory="Input"
    //% group=AnalogPin
    export function octopus_Rotation_Linear(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }
    //% block="ADKeyPad connects to %pin Press button %state"
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=5
    //% subcategory="Input"
    //% group=AnalogPin
    export function octopus_ADKeyPad(pin: AnalogPin, state: ADKeyPad_state): boolean {
        switch (state) {
            case 0:
                if (pins.analogReadPin(pin) > 0 && pins.analogReadPin(pin) < 20) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 1:
                if (pins.analogReadPin(pin) > 30 && pins.analogReadPin(pin) < 70) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 2:
                if (pins.analogReadPin(pin) > 70 && pins.analogReadPin(pin) < 110) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 3:
                if (pins.analogReadPin(pin) > 110 && pins.analogReadPin(pin) < 150) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 4:
                if (pins.analogReadPin(pin) > 150 && pins.analogReadPin(pin) < 600) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            default:
                return false
        }
    }
    //% block="Push Lock E-Switch connects to %pin Status is %state"
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=2
    //% subcategory="Input"
    //% group=DigitalPin
    export function octopus_Push_Lock(pin: DigitalPin, state: Button_state): boolean {
        switch (state) {
            case 0:
                if (pins.digitalReadPin(pin) == 0) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 1:
                if (pins.digitalReadPin(pin) == 1) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            default:
                return false;
        }
    }


    /***************************************************************************************************************************************/
}
