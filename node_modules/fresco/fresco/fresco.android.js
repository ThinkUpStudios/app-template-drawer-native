var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var commonModule = require("./fresco-common");
var utils = require("utils/utils");
var FrescoDrawee = (function (_super) {
    __extends(FrescoDrawee, _super);
    function FrescoDrawee() {
        _super.apply(this, arguments);
    }
    FrescoDrawee.prototype._createUI = function () {
        this._android = new com.facebook.drawee.view.SimpleDraweeView(this._context);
        this.initImage();
    };
    FrescoDrawee.prototype._clearAndroidReference = function () {
        this._android.setImageURI(null, null);
        this._android = undefined;
        _super.prototype._clearAndroidReference.call(this);
    };
    Object.defineProperty(FrescoDrawee.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    FrescoDrawee.prototype.onImageUriChanged = function (args) {
        this.initImage();
    };
    FrescoDrawee.prototype.initImage = function () {
        if (this._android) {
            this._android.setImageURI(null, null);
            if (this.imageUri) {
                if (!utils.isFileOrResourcePath(this.imageUri)) {
                    this._android.setImageURI(android.net.Uri.parse(this.imageUri), null);
                }
                else {
                    var res = utils.ad.getApplicationContext().getResources();
                    if (!res) {
                        return;
                    }
                    if (!utils.isFileOrResourcePath(this.imageUri)) {
                        throw new Error("Path \"" + "\" is not a valid file or resource.");
                    }
                    var path = this.imageUri;
                    if (path.indexOf(utils.RESOURCE_PREFIX) === 0) {
                        var resName = path.substr(utils.RESOURCE_PREFIX.length);
                        var identifier = res.getIdentifier(resName, 'drawable', utils.ad.getApplication().getPackageName());
                        if (0 < identifier) {
                            var uri = new android.net.Uri.Builder()
                                .scheme(com.facebook.common.util.UriUtil.LOCAL_RESOURCE_SCHEME)
                                .path(java.lang.String.valueOf(identifier))
                                .build();
                            this._android.setImageURI(uri);
                        }
                    }
                }
            }
        }
    };
    return FrescoDrawee;
})(commonModule.FrescoDrawee);
exports.FrescoDrawee = FrescoDrawee;
