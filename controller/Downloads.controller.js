/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/*global history */
sap.ui.define([
		"jekunauto/ui/erp/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("jekunauto.ui.erp.controller.Downloads", {

			/**
			 * Called when the controller is instantiated.
			 * @public
			 */
			onInit : function () {
				this.getRouter().getRoute("downloads").attachPatternMatched(this._onMatched, this);
			},

			/**
			 * Handles "downloads" routing
			 * @function
			 * @private
			 */
			_onMatched: function () {
				this.hideMasterSide();
			}
		});
	}
);