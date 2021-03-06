/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/*global location */
sap.ui.define([
		"jekunauto/ui/erp/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"jekunauto/ui/erp/controller/util/XML2JSONUtils",
		"sap/ui/Device",
		"jekunauto/ui/erp/util/ToggleFullScreenHandler"
	], function (BaseController, JSONModel, XML2JSONUtils, Device, ToggleFullScreenHandler) {
		"use strict";

		return BaseController.extend("jekunauto.ui.erp.controller.TopicDetail", {


			/* =========================================================== */
			/* lifecycle methods										   */
			/* =========================================================== */

			onInit: function () {
				this.oPage = this.byId("topicDetailPage");
				this.oPage.addStyleClass('docuPage');

				if ( !window.prettyPrint ) {
					jQuery.sap.require("jekunauto.ui.erp.thirdparty.google-code-prettify.prettify");
				}

				this.getRouter().getRoute("topicId").attachPatternMatched(this._onTopicMatched, this);
				this._oConfig = this.getConfig();

				this.jsonDefModel = new JSONModel();
				this.getView().setModel(this.jsonDefModel);
			},

			onBeforeRendering: function() {
				Device.orientation.detachHandler(this._onOrientationChange, this);
			},

			onAfterRendering: function() {
				Device.orientation.attachHandler(this._onOrientationChange, this);
			},

			onExit: function() {
				Device.orientation.detachHandler(this._onOrientationChange, this);
			},

			/* =========================================================== */
			/* begin: internal methods									 */
			/* =========================================================== */

			/**
			 * Binds the view to the object path and expands the aggregated line items.
			 * @function
			 * @param {sap.ui.base.Event} event pattern match event in route 'topicId'
			 * @private
			 */
			_onTopicMatched: function (event) {
				var topicId = event.getParameter("arguments").id,
					topicURL = this._oConfig.docuPath + topicId + (topicId.match(/\.html/) ? "" : ".html"),
					htmlContent = jQuery.sap.syncGetText(topicURL).data,
					jsonObj;

				if (!htmlContent) {
					return;
				}

				jsonObj = XML2JSONUtils.XML2JSON(htmlContent, this._oConfig);
				jsonObj.topicURL = topicURL;


				this.jsonDefModel.setData(jsonObj);

				this._scrollContentToTop();

				setTimeout(window.prettyPrint, 0);

				this.searchResultsButtonVisibilitySwitch(this.getView().byId("topicDetailBackToSearch"));

				if (this.extHookonTopicMatched) {
					this.extHookonTopicMatched(topicId);
				}
			},

			_scrollContentToTop: function () {
				if (this.oPage && this.oPage.$().length > 0) {
					this.oPage.getScrollDelegate().scrollTo(0, 1);
				}
			},

			_formatHTML: function(html) {
				return '<div>' + html + '</div>';
			},

			_onOrientationChange: function(e) {
				var page = this.getView().byId("topicDetailPage");

				if (e.landscape) {
					page.setShowHeader(false);
				} else {
					page.setShowHeader(true);
				}
			},

			backToSearch: function (text) {
				this.onNavBack();
			},

			onToggleFullScreen: function(oEvent) {
				ToggleFullScreenHandler.updateMode(oEvent, this.getView(), this);
			}

		});

	}
);