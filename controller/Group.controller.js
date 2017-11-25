/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/*global location */
sap.ui.define([
		"jekunauto/ui/erp/controller/BaseController",
		"sap/ui/Device"
	], function (BaseController, Device) {
		"use strict";

		return BaseController.extend("jekunauto.ui.erp.controller.Group", {

			/* =========================================================== */
			/* lifecycle methods										   */
			/* =========================================================== */

			onInit: function () {
				this.getRouter().getRoute("group").attachPatternMatched(this._onGroupMatched, this);
			},

			/* =========================================================== */
			/* begin: internal methods									 */
			/* =========================================================== */

			_onGroupMatched: function (event) {
				this._id = event.getParameter("arguments").id;
			}
		});
	}
);