(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tree-view {\r\n  display: inline-block;\r\n}\r\n\r\n.move-btn-container {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n}\r\n\r\n.loader  {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  background-color: gray;\r\n  opacity: 0.4;\r\n  height: 100vh;\r\n  width: 100vw;\r\n  z-index: 1000;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.reset-button {\r\n  cursor: pointer;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-layout\">\r\n  <div style=\"text-align:center\">\r\n    <h1>\r\n      Welcome to {{ title }}!\r\n    </h1>\r\n  </div>\r\n  <div #mainContent>\r\n    <table rows=\"20\">\r\n      <tr>\r\n        <td colspan=\"9\">\r\n          <cach-tree-view #cache class=\"tree-view\"></cach-tree-view>\r\n        </td>\r\n        <td colspan=\"2\">\r\n          <div class=\"move-btn-container\">\r\n            <div matTooltip=\"Move selected node from right treeview to left\">\r\n              <button (click)=\"moveSelectedToCache()\"\r\n                      [disabled]=\"isMoveDisabled()\"\r\n                      [style.cursor]=\"isMoveDisabled() ? 'default' : 'pointer'\"><<<</button>\r\n            </div>\r\n          </div>\r\n        </td>\r\n        <td colspan=\"9\">\r\n          <db-tree-view #source class=\"tree-view\"></db-tree-view>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td>\r\n          <div matTooltip=\"Add new child to the selected node in left treeview\">\r\n            <button (click)=\"addCreate()\"\r\n                    [disabled]=\"isOperDisabled()\"\r\n                    [style.cursor]=\"isOperDisabled() ? 'default' : 'pointer'\">+</button>\r\n          </div>\r\n        </td>\r\n        <td>\r\n          <div matTooltip=\"Delete selected node in the left treeview\">\r\n            <button (click)=\"addDelete()\"\r\n                    [disabled]=\"isOperDisabled()\"\r\n                    [style.cursor]=\"isOperDisabled() ? 'default' : 'pointer'\">-</button>\r\n          </div>\r\n        </td>\r\n        <td colspan=\"3\">\r\n          <div matTooltip=\"Update selected node in the left treeview\">\r\n            <button (click)=\"addUpdate()\"\r\n                    [disabled]=\"isOperDisabled()\"\r\n                    [style.cursor]=\"isOperDisabled() ? 'default' : 'pointer'\">a</button>\r\n          </div>\r\n        </td>\r\n        <td colspan=\"2\">\r\n          <div matTooltip=\"Apply changes to the data base\">\r\n            <button (click)=\"applyChanges()\"\r\n                    [disabled]=\"isApplyDisabled()\"\r\n                    [style.cursor]=\"isApplyDisabled() ? 'default' : 'pointer'\">Apply</button>\r\n          </div>\r\n        </td>\r\n        <td colspan=\"2\">\r\n          <div matTooltip=\"Reset data base to the default state\">\r\n            <button class=\"reset-button\"\r\n                    (click)=\"resetTree()\">Reset</button>\r\n          </div>\r\n        </td>\r\n      </tr>\r\n    </table>\r\n  </div>\r\n  <div #loader [hidden]=\"!(source.service.loading || cache.service.loading)\">\r\n    <div class=\"loader\">\r\n      <mat-spinner></mat-spinner>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _dialogs_setvaluedialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dialogs/setvaluedialog.component */ "./src/app/dialogs/setvaluedialog.component.ts");
/* harmony import */ var _dialogs_confirmdialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dialogs/confirmdialog.component */ "./src/app/dialogs/confirmdialog.component.ts");
/* harmony import */ var _dialogs_showerrordialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dialogs/showerrordialog.component */ "./src/app/dialogs/showerrordialog.component.ts");
/* harmony import */ var _services_operations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/operations */ "./src/app/services/operations.ts");
/* harmony import */ var _treeview_treeview_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./treeview/treeview.component */ "./src/app/treeview/treeview.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = /** @class */ (function () {
    function AppComponent(dialog) {
        this.dialog = dialog;
        this.title = 'cached-db';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.source.service.readAll();
    };
    AppComponent.prototype.isMoveDisabled = function () {
        var node = this.source.getSelectedNode();
        return !node || this.cache.service.contains(node.id);
    };
    AppComponent.prototype.isOperDisabled = function () {
        return !this.cache.getSelectedNode();
    };
    AppComponent.prototype.isApplyDisabled = function () {
        return !this.cache.service.applyable;
    };
    AppComponent.prototype.moveSelectedToCache = function () {
        this.cache.service.addNode(this.source.getSelectedNode().id);
        this.source.deselect();
    };
    AppComponent.prototype.addCreate = function () {
        var _this = this;
        this.openSetValueDialog('Add New Child of Node', '').then(function (value) {
            if (value && value.trim()) {
                var c = new _services_operations__WEBPACK_IMPORTED_MODULE_5__["Create"](_this.cache.getSelectedNode().id, value);
                _this.cache.service.addOperation(c);
                _this.cache.deselect();
            }
        });
    };
    AppComponent.prototype.addDelete = function () {
        var _this = this;
        var selectedNode = this.cache.getSelectedNode();
        var q = "Are you sure you want to delete the node \"" + selectedNode.value + "\" and all its descendants?";
        this.openConfirmDialog('Delete Node', q).then(function (result) {
            if (result) {
                var d = new _services_operations__WEBPACK_IMPORTED_MODULE_5__["Delete"](selectedNode.id);
                _this.cache.service.addOperation(d);
                _this.cache.deselect();
            }
        });
    };
    AppComponent.prototype.addUpdate = function () {
        var _this = this;
        var selectedNode = this.cache.getSelectedNode();
        var oldValue = selectedNode.value;
        this.openSetValueDialog('Edit Node', selectedNode.value).then(function (value) {
            if (value && oldValue != value) {
                var u = new _services_operations__WEBPACK_IMPORTED_MODULE_5__["Update"](selectedNode.id, value);
                _this.cache.service.addOperation(u);
                _this.cache.deselect();
            }
        });
    };
    AppComponent.prototype.applyChanges = function () {
        var _this = this;
        this.cache.service.applyChangesToBase().subscribe(function (resp) {
            _this.source.service.readAll();
        }, function (err) {
            _this.openShowErrorDialog('Invalid changes', err.error).then(function () {
                _this.cache.service.clear();
                _this.cache.service.clearChanges();
            });
        });
    };
    AppComponent.prototype.resetTree = function () {
        var _this = this;
        this.source.service.resetNodes().subscribe(function () {
            _this.cache.service.clear();
            _this.cache.service.clearChanges();
            _this.source.service.readAll();
        });
    };
    AppComponent.prototype.openSetValueDialog = function (title, value) {
        var dialogConfig = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogConfig"]();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.data = {
            value: value,
            title: title
        };
        var dialogRef = this.dialog.open(_dialogs_setvaluedialog_component__WEBPACK_IMPORTED_MODULE_2__["SetValueDialog"], dialogConfig);
        return dialogRef.afterClosed().toPromise();
    };
    AppComponent.prototype.openConfirmDialog = function (title, question) {
        var dialogConfig = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogConfig"]();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.data = {
            title: title,
            question: question
        };
        var dialogRef = this.dialog.open(_dialogs_confirmdialog_component__WEBPACK_IMPORTED_MODULE_3__["ConfirmDialog"], dialogConfig);
        return dialogRef.afterClosed().toPromise();
    };
    AppComponent.prototype.openShowErrorDialog = function (title, message) {
        var dialogConfig = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogConfig"]();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.data = {
            title: title,
            message: message
        };
        var dialogRef = this.dialog.open(_dialogs_showerrordialog_component__WEBPACK_IMPORTED_MODULE_4__["ShowErrorDialog"], dialogConfig);
        return dialogRef.afterClosed().toPromise();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_treeview_treeview_component__WEBPACK_IMPORTED_MODULE_6__["CachTreeViewComponent"]),
        __metadata("design:type", _treeview_treeview_component__WEBPACK_IMPORTED_MODULE_6__["CachTreeViewComponent"])
    ], AppComponent.prototype, "cache", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_treeview_treeview_component__WEBPACK_IMPORTED_MODULE_6__["DBTreeViewComponent"]),
        __metadata("design:type", _treeview_treeview_component__WEBPACK_IMPORTED_MODULE_6__["DBTreeViewComponent"])
    ], AppComponent.prototype, "source", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'my-app',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm5/tree.es5.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm5/grid-list.es5.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _dialogs_setvaluedialog_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dialogs/setvaluedialog.component */ "./src/app/dialogs/setvaluedialog.component.ts");
/* harmony import */ var _dialogs_confirmdialog_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dialogs/confirmdialog.component */ "./src/app/dialogs/confirmdialog.component.ts");
/* harmony import */ var _dialogs_showerrordialog_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dialogs/showerrordialog.component */ "./src/app/dialogs/showerrordialog.component.ts");
/* harmony import */ var _treeview_treeview_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./treeview/treeview.component */ "./src/app/treeview/treeview.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__["MatTreeModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_5__["MatGridListModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__["MatProgressSpinnerModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatDialogModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_9__["HttpModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpClientModule"],
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_11__["AppComponent"],
                _dialogs_setvaluedialog_component__WEBPACK_IMPORTED_MODULE_12__["SetValueDialog"],
                _dialogs_confirmdialog_component__WEBPACK_IMPORTED_MODULE_13__["ConfirmDialog"],
                _dialogs_showerrordialog_component__WEBPACK_IMPORTED_MODULE_14__["ShowErrorDialog"],
                _treeview_treeview_component__WEBPACK_IMPORTED_MODULE_15__["DBTreeViewComponent"],
                _treeview_treeview_component__WEBPACK_IMPORTED_MODULE_15__["CachTreeViewComponent"],
            ],
            bootstrap: [
                _app_component__WEBPACK_IMPORTED_MODULE_11__["AppComponent"],
            ],
            entryComponents: [
                _dialogs_setvaluedialog_component__WEBPACK_IMPORTED_MODULE_12__["SetValueDialog"],
                _dialogs_confirmdialog_component__WEBPACK_IMPORTED_MODULE_13__["ConfirmDialog"],
                _dialogs_showerrordialog_component__WEBPACK_IMPORTED_MODULE_14__["ShowErrorDialog"],
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/dialogs/confirmdialog.component.ts":
/*!****************************************************!*\
  !*** ./src/app/dialogs/confirmdialog.component.ts ***!
  \****************************************************/
/*! exports provided: ConfirmDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmDialog", function() { return ConfirmDialog; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ConfirmDialog = /** @class */ (function () {
    function ConfirmDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.title = '';
        this.question = '';
        this.title = data.title;
        this.question = data.question;
    }
    ConfirmDialog.prototype.confirm = function () {
        this.dialogRef.close(true);
    };
    ConfirmDialog.prototype.cancel = function () {
        this.dialogRef.close(false);
    };
    ConfirmDialog = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: "<h2 mat-dialog-title>{{title}}</h2>\n             <div class=\"mat-expansion-panel-content\">{{question}}</div>\n             <mat-dialog-actions>\n               <button class=\"mat-raised-button\" (click)=\"cancel()\">Cancel</button>\n               <button class=\"mat-raised-button mat-primary\" (click)=\"confirm()\">Confirm</button>\n             </mat-dialog-actions>"
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], ConfirmDialog);
    return ConfirmDialog;
}());



/***/ }),

/***/ "./src/app/dialogs/setvaluedialog.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/dialogs/setvaluedialog.component.ts ***!
  \*****************************************************/
/*! exports provided: SetValueDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetValueDialog", function() { return SetValueDialog; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var SetValueDialog = /** @class */ (function () {
    function SetValueDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.value = '';
        this.title = '';
        this.value = data.value;
        this.title = data.title;
    }
    SetValueDialog.prototype.save = function () {
        this.dialogRef.close(this.value);
    };
    SetValueDialog.prototype.cancel = function () {
        this.dialogRef.close();
    };
    SetValueDialog = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: "<h2 mat-dialog-title>{{title}}</h2>\n             <input matInput type=\"text\"\n                             [(ngModel)]=\"value\"\n                             placeholder=\"Enter value...\" />\n             <mat-dialog-actions>\n               <button class=\"mat-raised-button\" (click)=\"cancel()\">Cancel</button>\n               <button class=\"mat-raised-button mat-primary\" (click)=\"save()\">Save</button>\n             </mat-dialog-actions>"
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], SetValueDialog);
    return SetValueDialog;
}());



/***/ }),

/***/ "./src/app/dialogs/showerrordialog.component.ts":
/*!******************************************************!*\
  !*** ./src/app/dialogs/showerrordialog.component.ts ***!
  \******************************************************/
/*! exports provided: ShowErrorDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowErrorDialog", function() { return ShowErrorDialog; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ShowErrorDialog = /** @class */ (function () {
    function ShowErrorDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.title = '';
        this.message = '';
        this.title = data.title;
        this.message = data.message;
    }
    ShowErrorDialog.prototype.ok = function () {
        this.dialogRef.close(false);
    };
    ShowErrorDialog = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: "<h2 mat-dialog-title>{{title}}</h2>\n             <div class=\"mat-expansion-panel-content\">{{message}}</div>\n             <mat-dialog-actions>\n               <button class=\"mat-raised-button\" (click)=\"ok()\">OK</button>\n             </mat-dialog-actions>"
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], ShowErrorDialog);
    return ShowErrorDialog;
}());



/***/ }),

/***/ "./src/app/models/node.model.ts":
/*!**************************************!*\
  !*** ./src/app/models/node.model.ts ***!
  \**************************************/
/*! exports provided: Node */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return Node; });
var Node = /** @class */ (function () {
    function Node() {
    }
    return Node;
}());



/***/ }),

/***/ "./src/app/services/builddata.ts":
/*!***************************************!*\
  !*** ./src/app/services/builddata.ts ***!
  \***************************************/
/*! exports provided: Builder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Builder", function() { return Builder; });
var Builder = /** @class */ (function () {
    function Builder() {
    }
    Builder.prototype.build = function (items) {
        var toRemove = [];
        for (var k in items) {
            var parentId = items[k].parent_id;
            if (parentId in items) {
                if ('children' in items[parentId])
                    items[parentId].children[k] = items[k];
                else
                    items[parentId].children = { k: items[k] };
                toRemove.push(k);
            }
            if (!('children' in items[k]))
                items[k].children = {};
        }
        toRemove.forEach(function (id) {
            delete items[id];
        });
        return items;
    };
    return Builder;
}());



/***/ }),

/***/ "./src/app/services/cache.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/cache.service.ts ***!
  \*******************************************/
/*! exports provided: Cache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cache", function() { return Cache; });
/* harmony import */ var _iservice_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./iservice.service */ "./src/app/services/iservice.service.ts");
/* harmony import */ var _operations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./operations */ "./src/app/services/operations.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_observable_merge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/observable/merge */ "./node_modules/rxjs-compat/_esm5/observable/merge.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs_operators_map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators/map */ "./node_modules/rxjs-compat/_esm5/operators/map.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var Cache = /** @class */ (function (_super) {
    __extends(Cache, _super);
    function Cache(httpClient) {
        var _this = _super.call(this, httpClient) || this;
        _this.httpClient = httpClient;
        _this._addIdSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        _this._rawNodes = {};
        _this._reloadCache = true;
        _this._changes = [];
        _this._changesSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        Object(rxjs_observable_merge__WEBPACK_IMPORTED_MODULE_5__["merge"])(_this._addIdSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (id) {
            _this.loading = true;
            return _this.httpClient.get(_this.API_URL + "single/", {
                params: {
                    id: id,
                    reload: _this._reloadCache.toString()
                }
            });
        }), Object(rxjs_operators_map__WEBPACK_IMPORTED_MODULE_7__["map"])(function (nodes) {
            _this._reloadCache = false;
            _this._rawNodes[nodes[0]['id']] = nodes[0];
            _this.updateRelations(JSON.parse(nodes[0]['relation_info']));
        })), _this._changesSubject).subscribe(function () {
            _this.loading = false;
            var preApplied = _this.preApplyChanges();
            return _this.dataChange.next(_this.buildTree(preApplied));
        }, function (error) {
            _this.loading = false;
        });
        return _this;
    }
    Cache.prototype.preApplyChanges = function () {
        return this._changes.reduce(function (accum, operation) {
            return operation.call(accum);
        }, JSON.parse(JSON.stringify(this._rawNodes)));
    };
    Cache.prototype.updateOperations = function (infoArray) {
        this._changes = infoArray.map(function (item) {
            return _operations__WEBPACK_IMPORTED_MODULE_1__["OperationFactory"].get(item);
        });
    };
    Cache.prototype.updateRelations = function (newRelations) {
        for (var id in this._rawNodes) {
            var rawNode = this._rawNodes[id];
            if (rawNode['id'] in newRelations) {
                if (newRelations[rawNode['id']] != null)
                    rawNode['relation'] = parseInt(newRelations[rawNode['id']]);
                else
                    rawNode['relation'] = null;
            }
        }
    };
    Cache.prototype.clearChanges = function () {
        this._changes = [];
        return this._changesSubject.next();
    };
    Cache.prototype.clear = function () {
        this._reloadCache = true;
        this._rawNodes = {};
    };
    Cache.prototype.contains = function (id) {
        return (id in this._rawNodes);
    };
    Cache.prototype.addNode = function (id) {
        return this._addIdSubject.next(id.toString());
    };
    Cache.prototype.addOperation = function (op) {
        this._changes.push(op);
        this._changesSubject.next(this._changes);
    };
    Object.defineProperty(Cache.prototype, "applyable", {
        get: function () {
            return this._changes.length;
        },
        enumerable: true,
        configurable: true
    });
    Cache.prototype.applyChangesToBase = function () {
        var _this = this;
        this.loading = true;
        return this.httpClient.post(this.API_URL + "apply", {
            params: {
                changes: this._changes
            }
        }).pipe(Object(rxjs_operators_map__WEBPACK_IMPORTED_MODULE_7__["map"])(function (resp) {
            _this.loading = false;
            _this.updateOperations(resp.changes);
            _this._rawNodes = _this.preApplyChanges();
            return _this.clearChanges();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(function (err, _) {
            _this.loading = false;
            throw err;
        }));
    };
    Cache = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], Cache);
    return Cache;
}(_iservice_service__WEBPACK_IMPORTED_MODULE_0__["IService"]));



/***/ }),

/***/ "./src/app/services/database.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/database.service.ts ***!
  \**********************************************/
/*! exports provided: Database */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Database", function() { return Database; });
/* harmony import */ var _iservice_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./iservice.service */ "./src/app/services/iservice.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Database = /** @class */ (function (_super) {
    __extends(Database, _super);
    function Database(httpClient) {
        var _this = _super.call(this, httpClient) || this;
        _this.httpClient = httpClient;
        return _this;
    }
    Database.prototype.readAll = function () {
        var _this = this;
        this.loading = true;
        return this.httpClient.get(this.API_URL + "nodes/").toPromise().then(function (data) {
            _this.loading = false;
            var obj = {};
            data.forEach(function (item) { obj[item['id']] = item; });
            return _this.dataChange.next(_this.buildTree(obj));
        }, function (error) {
            _this.loading = false;
        });
    };
    Database = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], Database);
    return Database;
}(_iservice_service__WEBPACK_IMPORTED_MODULE_0__["IService"]));



/***/ }),

/***/ "./src/app/services/iservice.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/iservice.service.ts ***!
  \**********************************************/
/*! exports provided: IService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IService", function() { return IService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _builddata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./builddata */ "./src/app/services/builddata.ts");
/* harmony import */ var _models_node_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/node.model */ "./src/app/models/node.model.ts");
/* harmony import */ var rxjs_operators_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators/map */ "./node_modules/rxjs-compat/_esm5/operators/map.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var IService = /** @class */ (function (_super) {
    __extends(IService, _super);
    function IService(httpClient) {
        var _this = _super.call(this) || this;
        _this.httpClient = httpClient;
        _this.API_URL = window.location.href;
        _this.dataChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        _this.loading = false;
        return _this;
    }
    Object.defineProperty(IService.prototype, "data", {
        get: function () { return this.dataChange.value; },
        enumerable: true,
        configurable: true
    });
    IService.prototype.buildTree = function (obj) {
        return this._buildTreeImpl(this.build(obj));
    };
    IService.prototype._buildTreeImpl = function (obj) {
        var nodes = [];
        for (var k in obj) {
            var item = obj[k];
            var node = new _models_node_model__WEBPACK_IMPORTED_MODULE_4__["Node"]();
            node.id = item.id;
            node.deleted = item.is_deleted;
            node.value = item.value;
            node.children = this._buildTreeImpl(item.children);
            nodes.push(node);
        }
        return nodes;
    };
    IService.prototype.resetNodes = function () {
        var _this = this;
        this.loading = true;
        return this.httpClient.get(this.API_URL + "reset/", {
            responseType: 'text'
        }).pipe(Object(rxjs_operators_map__WEBPACK_IMPORTED_MODULE_5__["map"])(function (resp) {
            _this.loading = false;
            return resp;
        }));
    };
    IService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], IService);
    return IService;
}(_builddata__WEBPACK_IMPORTED_MODULE_3__["Builder"]));



/***/ }),

/***/ "./src/app/services/operations.ts":
/*!****************************************!*\
  !*** ./src/app/services/operations.ts ***!
  \****************************************/
/*! exports provided: Operation, Create, Delete, Update, OperationFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Operation", function() { return Operation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Create", function() { return Create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Delete", function() { return Delete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Update", function() { return Update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperationFactory", function() { return OperationFactory; });
/* harmony import */ var guid_typescript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! guid-typescript */ "./node_modules/guid-typescript/dist/guid.js");
/* harmony import */ var guid_typescript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(guid_typescript__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _builddata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./builddata */ "./src/app/services/builddata.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Operation = /** @class */ (function (_super) {
    __extends(Operation, _super);
    function Operation() {
        var _this = _super.call(this) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return Operation;
}(_builddata__WEBPACK_IMPORTED_MODULE_1__["Builder"]));

var Create = /** @class */ (function (_super) {
    __extends(Create, _super);
    function Create(parentId, value, id) {
        if (id === void 0) { id = null; }
        var _this = _super.call(this) || this;
        _this.parentId = parentId;
        _this.value = value;
        _this.id = id;
        return _this;
    }
    Create.prototype.call = function (nodes) {
        if (!this.id)
            this.id = guid_typescript__WEBPACK_IMPORTED_MODULE_0__["Guid"].raw();
        var newRawNode = {
            id: this.id,
            is_deleted: false,
            parent_id: this.parentId,
            value: this.value,
            relation: 0
        };
        nodes[this.id] = newRawNode;
        return nodes;
    };
    return Create;
}(Operation));

var Delete = /** @class */ (function (_super) {
    __extends(Delete, _super);
    function Delete(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        return _this;
    }
    Delete.prototype.traverse = function (item, callback) {
        callback(item);
        for (var k in item.children)
            this.traverse(item.children[k], callback);
    };
    Delete.prototype.call = function (nodes) {
        var _this = this;
        var toRemove = new Set([this.id]);
        var obj = this.build(nodes);
        for (var k in obj) {
            var item = obj[k];
            this.traverse(item, function (a) {
                if (a.id == _this.id) {
                    _this.traverse(a, function (b) {
                        toRemove.add(b.id);
                    });
                }
            });
        }
        for (var k in obj) {
            var item = obj[k];
            if (toRemove.has(item.relation)) {
                this.traverse(item, function (a) {
                    toRemove.add(a.id);
                });
            }
        }
        toRemove.forEach(function (id) {
            nodes[id].is_deleted = true;
        });
        return nodes;
    };
    return Delete;
}(Operation));

var Update = /** @class */ (function (_super) {
    __extends(Update, _super);
    function Update(id, value) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.value = value;
        return _this;
    }
    Update.prototype.call = function (nodes) {
        nodes[this.id].value = this.value;
        return nodes;
    };
    return Update;
}(Operation));

var OperationFactory = /** @class */ (function () {
    function OperationFactory() {
    }
    OperationFactory.get = function (cfg) {
        if (cfg['name'] == 'Create')
            return new Create(cfg['parentId'], cfg['value'], cfg['id']);
        else if (cfg['name'] == 'Delete')
            return new Delete(cfg['id']);
        else
            return new Update(cfg['id'], cfg['value']);
    };
    return OperationFactory;
}());



/***/ }),

/***/ "./src/app/treeview/treeview.component.css":
/*!*************************************************!*\
  !*** ./src/app/treeview/treeview.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".db-tree-view {\r\n  border: 1pt solid black;\r\n  overflow-y: scroll;\r\n  max-height: 80vh;\r\n  min-height: 80vh;\r\n  min-width: 32vw;\r\n}\r\n\r\n.db-tree-view ul,\r\n.db-tree-view li {\r\n  margin-top: 0;\r\n  margin-bottom: 0;\r\n  list-style-type: none;\r\n}"

/***/ }),

/***/ "./src/app/treeview/treeview.component.html":
/*!**************************************************!*\
  !*** ./src/app/treeview/treeview.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tree class=\"db-tree-view\"\r\n          [dataSource]=\"nestedDataSource\"\r\n          [treeControl]=\"nestedTreeControl\">\r\n  <mat-nested-tree-node *matTreeNodeDef=\"let node; when: hasNestedChild\">\r\n    <li>\r\n      <div class=\"mat-tree-node\"\r\n           [style.backgroundColor]=\"node.deleted ? '#f44336' : (node.selected ? '#dddddd' : 'inherit')\"\r\n           [style.textDecoration]=\"node.deleted ? 'line-through' : 'none'\"\r\n           [style.cursor]=\"node.deleted ? 'not-allowed' : 'pointer'\"\r\n           (click)=\"rowClick(node)\">\r\n        {{node.value}}\r\n      </div>\r\n      <ul>\r\n        <ng-container matTreeNodeOutlet></ng-container>\r\n      </ul>\r\n    </li>\r\n  </mat-nested-tree-node>\r\n</mat-tree>"

/***/ }),

/***/ "./src/app/treeview/treeview.component.ts":
/*!************************************************!*\
  !*** ./src/app/treeview/treeview.component.ts ***!
  \************************************************/
/*! exports provided: DBTreeViewComponent, CachTreeViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DBTreeViewComponent", function() { return DBTreeViewComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CachTreeViewComponent", function() { return CachTreeViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/tree */ "./node_modules/@angular/cdk/esm5/tree.es5.js");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm5/tree.es5.js");
/* harmony import */ var _services_database_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/database.service */ "./src/app/services/database.service.ts");
/* harmony import */ var _services_cache_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/cache.service */ "./src/app/services/cache.service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TreeViewComponent = /** @class */ (function () {
    function TreeViewComponent(service) {
        var _this = this;
        this.service = service;
        this.hasNestedChild = function (_, nodeData) { return !!nodeData.children.length; };
        this._getChildren = function (node) { return node.children; };
        this._prevClickedNode = null;
        this._selectedNode = null;
        this.nestedTreeControl = new _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_1__["NestedTreeControl"](this._getChildren);
        this.nestedDataSource = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_2__["MatTreeNestedDataSource"]();
        this.service.dataChange.subscribe(function (data) {
            _this.nestedDataSource.data = data;
        });
    }
    TreeViewComponent.prototype.rowClick = function (node) {
        if (!node.deleted) {
            if (this._prevClickedNode && this._prevClickedNode != node)
                this._prevClickedNode.selected = false;
            this._prevClickedNode = node;
            node.selected = !node.selected;
            if (node.selected)
                this._selectedNode = node;
            else
                this._selectedNode = null;
        }
    };
    TreeViewComponent.prototype.getSelectedNode = function () {
        return this._selectedNode;
    };
    TreeViewComponent.prototype.deselect = function () {
        this.rowClick(this._selectedNode);
    };
    return TreeViewComponent;
}());
var DBTreeViewComponent = /** @class */ (function (_super) {
    __extends(DBTreeViewComponent, _super);
    function DBTreeViewComponent(service) {
        var _this = _super.call(this, service) || this;
        _this.service = service;
        return _this;
    }
    DBTreeViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'db-tree-view',
            template: __webpack_require__(/*! ./treeview.component.html */ "./src/app/treeview/treeview.component.html"),
            styles: [__webpack_require__(/*! ./treeview.component.css */ "./src/app/treeview/treeview.component.css")],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
        }),
        __metadata("design:paramtypes", [_services_database_service__WEBPACK_IMPORTED_MODULE_3__["Database"]])
    ], DBTreeViewComponent);
    return DBTreeViewComponent;
}(TreeViewComponent));

var CachTreeViewComponent = /** @class */ (function (_super) {
    __extends(CachTreeViewComponent, _super);
    function CachTreeViewComponent(service) {
        var _this = _super.call(this, service) || this;
        _this.service = service;
        return _this;
    }
    CachTreeViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'cach-tree-view',
            template: __webpack_require__(/*! ./treeview.component.html */ "./src/app/treeview/treeview.component.html"),
            styles: [__webpack_require__(/*! ./treeview.component.css */ "./src/app/treeview/treeview.component.css")],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
        }),
        __metadata("design:paramtypes", [_services_cache_service__WEBPACK_IMPORTED_MODULE_4__["Cache"]])
    ], CachTreeViewComponent);
    return CachTreeViewComponent;
}(TreeViewComponent));



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\challenge\django-crm\crmapp\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map