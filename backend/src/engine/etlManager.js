"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.etlInstance = void 0;
var EventEmitter = require("events");
var config_1 = require("../config");
var counties = require("./counties.json");
var states = require("./states.json");
var db_1 = require("../db");
if (!counties) {
    Error("Counties not found");
}
if (!states) {
    Error("States not found");
}
var ETLManagerEvents;
(function (ETLManagerEvents) {
    ETLManagerEvents["ETL_ERROR"] = "armadillo-slay-etl-error";
    ETLManagerEvents["POWER_DATA_FETCHED"] = "armadillo-slay-power-data-fetched";
    ETLManagerEvents["CENSUS_DATA_FETCHED"] = "armadillo-slay-census-data-fetched";
    ETLManagerEvents["DATA_TRANSFORMED"] = "armadillo-slay-data-normalized";
    ETLManagerEvents["START_ETL_JOB"] = "armadillo-slay-start-etl-job";
    ETLManagerEvents["START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE"] = "armadillo-slay-start-etl-job-for-all-counties-in-state";
    ETLManagerEvents["DATA_LOADED"] = "armadillo-slay-data-loaded";
    ETLManagerEvents["ETL_COMPLETE"] = "armadillo-slay-etl-complete";
})(ETLManagerEvents || (ETLManagerEvents = {}));
var countiesMap = new Map(counties.map(function (county) { return [county.fips_code, county]; }));
var statesMap = new Map(Object.entries(states).map(function (_a) {
    var fips = _a[0], state = _a[1];
    return [state, fips];
}));
console.log(countiesMap);
console.log(statesMap);
var POWER_API_URLS = [
    'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN,ALLSKY_SFC_SW_DWN_HR,ALLSKY_SFC_SW_DNI,ALLSKY_SFC_SW_DIFF,ALLSKY_KT,TOA_SW_DWN,ALLSKY_SFC_PAR_TOT,ALLSKY_SRF_ALB,SI_EF_TILTED_SURFACE,CLRSKY_SFC_SW_DWN&community=RE',
    'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=SG_NOON,SG_HR_SET_ANG,SG_MID_COZ_ZEN_ANG,SG_DEC,SG_DAY_HOURS,SG_HRZ_HR,SG_DAY_COZ_ZEN_AVG,T2M,T2MDEW,T2MWET,TS,FROST_DAYS,QV2M,RH2M,PRECTOTCORR,PRECTOTCORR_SUM&community=RE',
    'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PS,WS10M,WD50M,WD10M,WS50M,CLOUD_AMT,SOLAR_DEFICITS_CONSEC_MONTH,INSOL_CONSEC_MONTH,MIDDAY_INSOL,EQUIV_NO_SUN_CONSEC_MONTH&community=RE'
];
function fetchPowerData(lng, lat) {
    return __awaiter(this, void 0, void 0, function () {
        var fetchers, _a, data1, data2, data3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fetchers = POWER_API_URLS.map(function (url) { return fetch("".concat(url, "&longitude=").concat(lng, "&latitude=").concat(lat, "&format=JSON")).then(function (response) { return response.json(); }); });
                    return [4 /*yield*/, Promise.all(fetchers)];
                case 1:
                    _a = _b.sent(), data1 = _a[0], data2 = _a[1], data3 = _a[2];
                    return [2 /*return*/, [data1, data2, data3]];
            }
        });
    });
}
function fetchCensusData(stateFips, countyFips) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.census.gov/data/2019/acs/acs5?get=NAME,B19013_001E&for=county:".concat(countyFips, "&in=state:").concat(stateFips, "&key=").concat(config_1.config.CENSUS_API_KEY);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var EtlManager = /** @class */ (function (_super) {
    __extends(ETLManager, _super);
    function ETLManager() {
        var _this = _super.call(this) || this;
        _this.on(ETLManagerEvents.START_ETL_JOB, function (_a) {
            var state = _a.state, county = _a.county;
            return _this.runETL(state, county);
        });
        _this.on(ETLManagerEvents.START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE, function (_a) {
            var state = _a.state;
            return _this.runETLForAllCountiesInState(state);
        });
        _this.on(ETLManagerEvents.DATA_TRANSFORMED, function (data) { return _this.load(data); });
        _this.on(ETLManagerEvents.DATA_LOADED, function () { return _this.emitETLComplete(); });
        _this.on(ETLManagerEvents.ETL_ERROR, function (error) { return _this.handleETLError(error); });
        return _this;
    }
    ETLManager.prototype.runETL = function (state, county) {
        return __awaiter(this, void 0, void 0, function () {
            var countyEntry, _a, powerData, censusData, transformed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("runETL", state, county);
                        countyEntry = this.getCountyEntry(state, county);
                        if (!countyEntry) {
                            this.emit(ETLManagerEvents.ETL_ERROR, { error: "County ".concat(county, " not found in state ").concat(state) });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.extract(countyEntry, state)];
                    case 1:
                        _a = _b.sent(), powerData = _a.powerData, censusData = _a.censusData;
                        this.emit(ETLManagerEvents.POWER_DATA_FETCHED, powerData);
                        this.emit(ETLManagerEvents.CENSUS_DATA_FETCHED, censusData);
                        transformed = this.transform(state, county, countyEntry.lat, countyEntry.lng, powerData, censusData);
                        this.emit(ETLManagerEvents.DATA_TRANSFORMED, transformed);
                        return [2 /*return*/];
                }
            });
        });
    };
    ETLManager.prototype.extract = function (countyEntry, state) {
        return __awaiter(this, void 0, void 0, function () {
            var countyFips, stateFips, _a, powerData, censusData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        countyFips = countyEntry.fips_code.toString().substring(2, 5);
                        stateFips = this.getStateFips(state);
                        return [4 /*yield*/, Promise.all([
                                fetchPowerData(countyEntry.lng, countyEntry.lat),
                                fetchCensusData(stateFips, countyFips)
                            ])];
                    case 1:
                        _a = _b.sent(), powerData = _a[0], censusData = _a[1];
                        return [2 /*return*/, { powerData: powerData, censusData: censusData }];
                }
            });
        });
    };
    ETLManager.prototype.load = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var client, db, collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('load', data);
                        return [4 /*yield*/, (0, db_1.newMongoConnection)()];
                    case 1:
                        client = _a.sent();
                        db = client.db(config_1.config.ETL_DB_NAME);
                        collection = db.collection(config_1.config.ETL_COLLECTION_NAME);
                        return [4 /*yield*/, collection.insertOne(data)];
                    case 2:
                        _a.sent();
                        this.emit(ETLManagerEvents.DATA_LOADED);
                        return [2 /*return*/];
                }
            });
        });
    };
    ETLManager.prototype.transform = function (state, county, lat, lng, powerData, censusData) {
        console.log("Normalized data for ".concat(state, " ").concat(county, " ").concat(lat, " ").concat(lng));
        console.log(powerData);
        console.log(censusData);
        return {
            state: state,
            county: county,
            lat: lat,
            lng: lng,
        };
    };
    ETLManager.prototype.getCountyEntry = function (state, countyName) {
        var stateFips = statesMap.get(state);
        if (!stateFips) {
            console.log("State ".concat(state, " not found"));
            return;
        }
        var entry = __spreadArray([], countiesMap.values(), true).filter(function (county) { return county.name === countyName && county.fips_code.toString().startsWith(stateFips); })
            .map(function (county) { return county; })[0];
        if (!entry) {
            throw new Error("County ".concat(countyName, " not found in state ").concat(state));
        }
        return entry;
    };
    ETLManager.prototype.getStateFips = function (state) {
        console.debug("getStateFips", state);
        var stateFips = statesMap.get(state);
        if (!stateFips) {
            throw new Error("State ".concat(state, " not found"));
        }
        return stateFips;
    };
    ETLManager.prototype.startETLJob = function (state, county) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.emit(ETLManagerEvents.START_ETL_JOB, { state: state, county: county });
                return [2 /*return*/];
            });
        });
    };
    ETLManager.prototype.startETLJobForAllCountiesInState = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.emit(ETLManagerEvents.START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE, { state: state });
                return [2 /*return*/];
            });
        });
    };
    ETLManager.prototype.runETLForAllCountiesInState = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            function getCountiesForState(state) {
                console.debug("getCountiesForState", state);
                var stateFips = statesMap.get(state);
                if (!stateFips) {
                    console.log("State ".concat(state, " not found"));
                    return;
                }
                return __spreadArray([], countiesMap.values(), true).filter(function (county) { return county.fips_code.toString().startsWith(stateFips); })
                    .map(function (county) { return county.name; });
            }
            var counties, _i, counties_1, county;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        counties = getCountiesForState(state);
                        _i = 0, counties_1 = counties;
                        _a.label = 1;
                    case 1:
                        if (!(_i < counties_1.length)) return [3 /*break*/, 4];
                        county = counties_1[_i];
                        return [4 /*yield*/, this.runETL(state, county)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ETLManager.prototype.emitETLComplete = function () {
        this.emit(ETLManagerEvents.ETL_COMPLETE);
    };
    ETLManager.prototype.handleETLError = function (error) {
        console.log('ETL Error', error);
    };
    ETLManager.prototype.startETLJobAllCounties = function (state) {
        this.emit(ETLManagerEvents.START_ETL_JOB_FOR_ALL_COUNTIES_IN_STATE, { state: state });
    };
    return ETLManager;
}(EventEmitter));
exports.etlInstance = new EtlManager();
