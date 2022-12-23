// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrlServer: 'https://localhost:7119',
  apiUrlAccount : "https://localhost:7119/api/v1/Account",
  apiUrlEvents : "https://localhost:7119/api/v1/Events",
  apiUrlHas : "https://localhost:7119/api/v1/Has",
  apiUrlEventTypes : "https://localhost:7119/api/v1/EventTypes",
  apiUrlCompanies: "https://localhost:7119/api/v1/Companies",
  apiUrlAddress: "https://localhost:7119/api/v1/Address",
  apiUrlAnnouncements: "https://localhost:7119/api/v1/Announcements"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
