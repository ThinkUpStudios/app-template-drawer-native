var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var viewModule = require("ui/core/view");
var dependencyObservable = require("ui/core/dependency-observable");
var proxyModule = require("ui/core/proxy");
var FrescoDrawee = (function (_super) {
    __extends(FrescoDrawee, _super);
    function FrescoDrawee() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(FrescoDrawee.prototype, "imageUri", {
        get: function () {
            return this._getValue(FrescoDrawee.imageUriProperty);
        },
        set: function (value) {
            this._setValue(FrescoDrawee.imageUriProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    FrescoDrawee.onImageUriPropertyChanged = function (args) {
        var drawee = args.object;
        drawee.onImageUriChanged(args);
    };
    FrescoDrawee.prototype.onImageUriChanged = function (args) {
    };
    FrescoDrawee.imageUriProperty = new dependencyObservable.Property("imageUri", "FrescoDrawee", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, FrescoDrawee.onImageUriPropertyChanged));
    return FrescoDrawee;
})(viewModule.View);
exports.FrescoDrawee = FrescoDrawee;
