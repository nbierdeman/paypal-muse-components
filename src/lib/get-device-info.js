/* @flow */
const _roundOffPerfTimer = num => {
    let roundOffNumber = -1;
    if (typeof num !== 'undefined') {
        if (num === parseInt(num, 10)) {
            roundOffNumber = num;
        } else if (num > 0 && num < 1) {
            roundOffNumber = parseFloat(num.toFixed(1));
        } else {
            roundOffNumber = parseFloat(num.toFixed(0));
        }
    }
    return roundOffNumber;
};

const getBrowserHeight = () => window.innerHeight;

const getBrowserWidth = () => window.innerWidth;

const getDeviceHeight = () => {
    const screen = window.screen || {};
    const ratio = window.devicePixelRatio || 1;

    let w = _roundOffPerfTimer(screen.width * ratio);
    let h = _roundOffPerfTimer(screen.height * ratio);

    if (Math.abs(window.orientation) === 90) {
        const temp = w;
        w = h;
        h = temp;
    }

    return h;
};

const getDeviceWidth = () => {
    const screen = window.screen || {};
    const ratio = window.devicePixelRatio || 1;

    let w = _roundOffPerfTimer(screen.width * ratio);
    let h = _roundOffPerfTimer(screen.height * ratio);

    if (Math.abs(window.orientation) === 90) {
        const temp = w;
        w = h;
        h = temp;
    }
    return w;
};

const getDeviceInfo = () => {
    try {
        const browserWidth = getBrowserWidth();
        const browserHeight = getBrowserHeight();
        let deviceType;
        if (navigator.userAgent.match(/mobile/i)) {
            deviceType = 'Mobile';
        } else if (navigator.userAgent.match(/iPad|Android|Touch/i)) {
            deviceType = 'Tablet';
        } else {
            deviceType = 'Desktop';
        }
        return {
            screenWidth:  getDeviceWidth(),
            screenHeight: getDeviceHeight(),
            colorDepth:   screen && screen.colorDepth,
            deviceType,
            browserHeight,
            browserWidth
        };
    } catch (err) {
        return {};
    }
};

/*
** cannot use export default because it can't be overwritten by our tests
** (which currently can't bring in sinon or it will error so this is the
** only option)
*/
module.exports = { getDeviceInfo }; // eslint-disable-line import/no-commonjs