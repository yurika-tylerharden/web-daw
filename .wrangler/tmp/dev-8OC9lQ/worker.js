var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0***REMOVED******REMOVED***)(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0***REMOVED******REMOVED***)((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key***REMOVED***, enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .wrangler/tmp/bundle-DCTOiV/checked-fetch.js
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-DCTOiV/checked-fetch.js"() {
    "use strict";
    urls = /* @__PURE__ */ new Set();
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init***REMOVED*** = argArray;
        checkURL(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_modules_watch_stub();
  }
});

// ../../../../opt/homebrew/lib/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../../../opt/homebrew/lib/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/@cloudflare/kv-asset-handler/node_modules/mime/Mime.js
var require_Mime = __commonJS({
  "node_modules/@cloudflare/kv-asset-handler/node_modules/mime/Mime.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null);
      this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < arguments.length; i++) {
        this.define(arguments[i***REMOVED***);
      }
      this.define = this.define.bind(this);
      this.getType = this.getType.bind(this);
      this.getExtension = this.getExtension.bind(this);
    }
    __name(Mime, "Mime");
    Mime.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type***REMOVED***.map(function(t) {
          return t.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i***REMOVED***;
          if (ext[0***REMOVED*** === "*") {
            continue;
          }
          if (!force && ext in this._types) {
            throw new Error(
              'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext***REMOVED*** + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
            );
          }
          this._types[ext***REMOVED*** = type;
        }
        if (force || !this._extensions[type***REMOVED***) {
          const ext = extensions[0***REMOVED***;
          this._extensions[type***REMOVED*** = ext[0***REMOVED*** !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime.prototype.getType = function(path) {
      path = String(path);
      let last = path.replace(/^.*[/\\***REMOVED***/, "").toLowerCase();
      let ext = last.replace(/^.*\./, "").toLowerCase();
      let hasPath = last.length < path.length;
      let hasDot = ext.length < last.length - 1;
      return (hasDot || !hasPath) && this._types[ext***REMOVED*** || null;
    };
    Mime.prototype.getExtension = function(type) {
      type = /^\s*([^;\s***REMOVED****)/.test(type) && RegExp.$1;
      return type && this._extensions[type.toLowerCase()***REMOVED*** || null;
    };
    module.exports = Mime;
  }
});

// node_modules/@cloudflare/kv-asset-handler/node_modules/mime/types/standard.js
var require_standard = __commonJS({
  "node_modules/@cloudflare/kv-asset-handler/node_modules/mime/types/standard.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = { "application/andrew-inset": ["ez"***REMOVED***, "application/applixware": ["aw"***REMOVED***, "application/atom+xml": ["atom"***REMOVED***, "application/atomcat+xml": ["atomcat"***REMOVED***, "application/atomdeleted+xml": ["atomdeleted"***REMOVED***, "application/atomsvc+xml": ["atomsvc"***REMOVED***, "application/atsc-dwd+xml": ["dwd"***REMOVED***, "application/atsc-held+xml": ["held"***REMOVED***, "application/atsc-rsat+xml": ["rsat"***REMOVED***, "application/bdoc": ["bdoc"***REMOVED***, "application/calendar+xml": ["xcs"***REMOVED***, "application/ccxml+xml": ["ccxml"***REMOVED***, "application/cdfx+xml": ["cdfx"***REMOVED***, "application/cdmi-capability": ["cdmia"***REMOVED***, "application/cdmi-container": ["cdmic"***REMOVED***, "application/cdmi-domain": ["cdmid"***REMOVED***, "application/cdmi-object": ["cdmio"***REMOVED***, "application/cdmi-queue": ["cdmiq"***REMOVED***, "application/cu-seeme": ["cu"***REMOVED***, "application/dash+xml": ["mpd"***REMOVED***, "application/davmount+xml": ["davmount"***REMOVED***, "application/docbook+xml": ["dbk"***REMOVED***, "application/dssc+der": ["dssc"***REMOVED***, "application/dssc+xml": ["xdssc"***REMOVED***, "application/ecmascript": ["es", "ecma"***REMOVED***, "application/emma+xml": ["emma"***REMOVED***, "application/emotionml+xml": ["emotionml"***REMOVED***, "application/epub+zip": ["epub"***REMOVED***, "application/exi": ["exi"***REMOVED***, "application/express": ["exp"***REMOVED***, "application/fdt+xml": ["fdt"***REMOVED***, "application/font-tdpfr": ["pfr"***REMOVED***, "application/geo+json": ["geojson"***REMOVED***, "application/gml+xml": ["gml"***REMOVED***, "application/gpx+xml": ["gpx"***REMOVED***, "application/gxf": ["gxf"***REMOVED***, "application/gzip": ["gz"***REMOVED***, "application/hjson": ["hjson"***REMOVED***, "application/hyperstudio": ["stk"***REMOVED***, "application/inkml+xml": ["ink", "inkml"***REMOVED***, "application/ipfix": ["ipfix"***REMOVED***, "application/its+xml": ["its"***REMOVED***, "application/java-archive": ["jar", "war", "ear"***REMOVED***, "application/java-serialized-object": ["ser"***REMOVED***, "application/java-vm": ["class"***REMOVED***, "application/javascript": ["js", "mjs"***REMOVED***, "application/json": ["json", "map"***REMOVED***, "application/json5": ["json5"***REMOVED***, "application/jsonml+json": ["jsonml"***REMOVED***, "application/ld+json": ["jsonld"***REMOVED***, "application/lgr+xml": ["lgr"***REMOVED***, "application/lost+xml": ["lostxml"***REMOVED***, "application/mac-binhex40": ["hqx"***REMOVED***, "application/mac-compactpro": ["cpt"***REMOVED***, "application/mads+xml": ["mads"***REMOVED***, "application/manifest+json": ["webmanifest"***REMOVED***, "application/marc": ["mrc"***REMOVED***, "application/marcxml+xml": ["mrcx"***REMOVED***, "application/mathematica": ["ma", "nb", "mb"***REMOVED***, "application/mathml+xml": ["mathml"***REMOVED***, "application/mbox": ["mbox"***REMOVED***, "application/mediaservercontrol+xml": ["mscml"***REMOVED***, "application/metalink+xml": ["metalink"***REMOVED***, "application/metalink4+xml": ["meta4"***REMOVED***, "application/mets+xml": ["mets"***REMOVED***, "application/mmt-aei+xml": ["maei"***REMOVED***, "application/mmt-usd+xml": ["musd"***REMOVED***, "application/mods+xml": ["mods"***REMOVED***, "application/mp21": ["m21", "mp21"***REMOVED***, "application/mp4": ["mp4s", "m4p"***REMOVED***, "application/msword": ["doc", "dot"***REMOVED***, "application/mxf": ["mxf"***REMOVED***, "application/n-quads": ["nq"***REMOVED***, "application/n-triples": ["nt"***REMOVED***, "application/node": ["cjs"***REMOVED***, "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"***REMOVED***, "application/oda": ["oda"***REMOVED***, "application/oebps-package+xml": ["opf"***REMOVED***, "application/ogg": ["ogx"***REMOVED***, "application/omdoc+xml": ["omdoc"***REMOVED***, "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"***REMOVED***, "application/oxps": ["oxps"***REMOVED***, "application/p2p-overlay+xml": ["relo"***REMOVED***, "application/patch-ops-error+xml": ["xer"***REMOVED***, "application/pdf": ["pdf"***REMOVED***, "application/pgp-encrypted": ["pgp"***REMOVED***, "application/pgp-signature": ["asc", "sig"***REMOVED***, "application/pics-rules": ["prf"***REMOVED***, "application/pkcs10": ["p10"***REMOVED***, "application/pkcs7-mime": ["p7m", "p7c"***REMOVED***, "application/pkcs7-signature": ["p7s"***REMOVED***, "application/pkcs8": ["p8"***REMOVED***, "application/pkix-attr-cert": ["ac"***REMOVED***, "application/pkix-cert": ["cer"***REMOVED***, "application/pkix-crl": ["crl"***REMOVED***, "application/pkix-pkipath": ["pkipath"***REMOVED***, "application/pkixcmp": ["pki"***REMOVED***, "application/pls+xml": ["pls"***REMOVED***, "application/postscript": ["ai", "eps", "ps"***REMOVED***, "application/provenance+xml": ["provx"***REMOVED***, "application/pskc+xml": ["pskcxml"***REMOVED***, "application/raml+yaml": ["raml"***REMOVED***, "application/rdf+xml": ["rdf", "owl"***REMOVED***, "application/reginfo+xml": ["rif"***REMOVED***, "application/relax-ng-compact-syntax": ["rnc"***REMOVED***, "application/resource-lists+xml": ["rl"***REMOVED***, "application/resource-lists-diff+xml": ["rld"***REMOVED***, "application/rls-services+xml": ["rs"***REMOVED***, "application/route-apd+xml": ["rapd"***REMOVED***, "application/route-s-tsid+xml": ["sls"***REMOVED***, "application/route-usd+xml": ["rusd"***REMOVED***, "application/rpki-ghostbusters": ["gbr"***REMOVED***, "application/rpki-manifest": ["mft"***REMOVED***, "application/rpki-roa": ["roa"***REMOVED***, "application/rsd+xml": ["rsd"***REMOVED***, "application/rss+xml": ["rss"***REMOVED***, "application/rtf": ["rtf"***REMOVED***, "application/sbml+xml": ["sbml"***REMOVED***, "application/scvp-cv-request": ["scq"***REMOVED***, "application/scvp-cv-response": ["scs"***REMOVED***, "application/scvp-vp-request": ["spq"***REMOVED***, "application/scvp-vp-response": ["spp"***REMOVED***, "application/sdp": ["sdp"***REMOVED***, "application/senml+xml": ["senmlx"***REMOVED***, "application/sensml+xml": ["sensmlx"***REMOVED***, "application/set-payment-initiation": ["setpay"***REMOVED***, "application/set-registration-initiation": ["setreg"***REMOVED***, "application/shf+xml": ["shf"***REMOVED***, "application/sieve": ["siv", "sieve"***REMOVED***, "application/smil+xml": ["smi", "smil"***REMOVED***, "application/sparql-query": ["rq"***REMOVED***, "application/sparql-results+xml": ["srx"***REMOVED***, "application/srgs": ["gram"***REMOVED***, "application/srgs+xml": ["grxml"***REMOVED***, "application/sru+xml": ["sru"***REMOVED***, "application/ssdl+xml": ["ssdl"***REMOVED***, "application/ssml+xml": ["ssml"***REMOVED***, "application/swid+xml": ["swidtag"***REMOVED***, "application/tei+xml": ["tei", "teicorpus"***REMOVED***, "application/thraud+xml": ["tfi"***REMOVED***, "application/timestamped-data": ["tsd"***REMOVED***, "application/toml": ["toml"***REMOVED***, "application/trig": ["trig"***REMOVED***, "application/ttml+xml": ["ttml"***REMOVED***, "application/ubjson": ["ubj"***REMOVED***, "application/urc-ressheet+xml": ["rsheet"***REMOVED***, "application/urc-targetdesc+xml": ["td"***REMOVED***, "application/voicexml+xml": ["vxml"***REMOVED***, "application/wasm": ["wasm"***REMOVED***, "application/widget": ["wgt"***REMOVED***, "application/winhlp": ["hlp"***REMOVED***, "application/wsdl+xml": ["wsdl"***REMOVED***, "application/wspolicy+xml": ["wspolicy"***REMOVED***, "application/xaml+xml": ["xaml"***REMOVED***, "application/xcap-att+xml": ["xav"***REMOVED***, "application/xcap-caps+xml": ["xca"***REMOVED***, "application/xcap-diff+xml": ["xdf"***REMOVED***, "application/xcap-el+xml": ["xel"***REMOVED***, "application/xcap-ns+xml": ["xns"***REMOVED***, "application/xenc+xml": ["xenc"***REMOVED***, "application/xhtml+xml": ["xhtml", "xht"***REMOVED***, "application/xliff+xml": ["xlf"***REMOVED***, "application/xml": ["xml", "xsl", "xsd", "rng"***REMOVED***, "application/xml-dtd": ["dtd"***REMOVED***, "application/xop+xml": ["xop"***REMOVED***, "application/xproc+xml": ["xpl"***REMOVED***, "application/xslt+xml": ["*xsl", "xslt"***REMOVED***, "application/xspf+xml": ["xspf"***REMOVED***, "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"***REMOVED***, "application/yang": ["yang"***REMOVED***, "application/yin+xml": ["yin"***REMOVED***, "application/zip": ["zip"***REMOVED***, "audio/3gpp": ["*3gpp"***REMOVED***, "audio/adpcm": ["adp"***REMOVED***, "audio/amr": ["amr"***REMOVED***, "audio/basic": ["au", "snd"***REMOVED***, "audio/midi": ["mid", "midi", "kar", "rmi"***REMOVED***, "audio/mobile-xmf": ["mxmf"***REMOVED***, "audio/mp3": ["*mp3"***REMOVED***, "audio/mp4": ["m4a", "mp4a"***REMOVED***, "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"***REMOVED***, "audio/ogg": ["oga", "ogg", "spx", "opus"***REMOVED***, "audio/s3m": ["s3m"***REMOVED***, "audio/silk": ["sil"***REMOVED***, "audio/wav": ["wav"***REMOVED***, "audio/wave": ["*wav"***REMOVED***, "audio/webm": ["weba"***REMOVED***, "audio/xm": ["xm"***REMOVED***, "font/collection": ["ttc"***REMOVED***, "font/otf": ["otf"***REMOVED***, "font/ttf": ["ttf"***REMOVED***, "font/woff": ["woff"***REMOVED***, "font/woff2": ["woff2"***REMOVED***, "image/aces": ["exr"***REMOVED***, "image/apng": ["apng"***REMOVED***, "image/avif": ["avif"***REMOVED***, "image/bmp": ["bmp"***REMOVED***, "image/cgm": ["cgm"***REMOVED***, "image/dicom-rle": ["drle"***REMOVED***, "image/emf": ["emf"***REMOVED***, "image/fits": ["fits"***REMOVED***, "image/g3fax": ["g3"***REMOVED***, "image/gif": ["gif"***REMOVED***, "image/heic": ["heic"***REMOVED***, "image/heic-sequence": ["heics"***REMOVED***, "image/heif": ["heif"***REMOVED***, "image/heif-sequence": ["heifs"***REMOVED***, "image/hej2k": ["hej2"***REMOVED***, "image/hsj2": ["hsj2"***REMOVED***, "image/ief": ["ief"***REMOVED***, "image/jls": ["jls"***REMOVED***, "image/jp2": ["jp2", "jpg2"***REMOVED***, "image/jpeg": ["jpeg", "jpg", "jpe"***REMOVED***, "image/jph": ["jph"***REMOVED***, "image/jphc": ["jhc"***REMOVED***, "image/jpm": ["jpm"***REMOVED***, "image/jpx": ["jpx", "jpf"***REMOVED***, "image/jxr": ["jxr"***REMOVED***, "image/jxra": ["jxra"***REMOVED***, "image/jxrs": ["jxrs"***REMOVED***, "image/jxs": ["jxs"***REMOVED***, "image/jxsc": ["jxsc"***REMOVED***, "image/jxsi": ["jxsi"***REMOVED***, "image/jxss": ["jxss"***REMOVED***, "image/ktx": ["ktx"***REMOVED***, "image/ktx2": ["ktx2"***REMOVED***, "image/png": ["png"***REMOVED***, "image/sgi": ["sgi"***REMOVED***, "image/svg+xml": ["svg", "svgz"***REMOVED***, "image/t38": ["t38"***REMOVED***, "image/tiff": ["tif", "tiff"***REMOVED***, "image/tiff-fx": ["tfx"***REMOVED***, "image/webp": ["webp"***REMOVED***, "image/wmf": ["wmf"***REMOVED***, "message/disposition-notification": ["disposition-notification"***REMOVED***, "message/global": ["u8msg"***REMOVED***, "message/global-delivery-status": ["u8dsn"***REMOVED***, "message/global-disposition-notification": ["u8mdn"***REMOVED***, "message/global-headers": ["u8hdr"***REMOVED***, "message/rfc822": ["eml", "mime"***REMOVED***, "model/3mf": ["3mf"***REMOVED***, "model/gltf+json": ["gltf"***REMOVED***, "model/gltf-binary": ["glb"***REMOVED***, "model/iges": ["igs", "iges"***REMOVED***, "model/mesh": ["msh", "mesh", "silo"***REMOVED***, "model/mtl": ["mtl"***REMOVED***, "model/obj": ["obj"***REMOVED***, "model/step+xml": ["stpx"***REMOVED***, "model/step+zip": ["stpz"***REMOVED***, "model/step-xml+zip": ["stpxz"***REMOVED***, "model/stl": ["stl"***REMOVED***, "model/vrml": ["wrl", "vrml"***REMOVED***, "model/x3d+binary": ["*x3db", "x3dbz"***REMOVED***, "model/x3d+fastinfoset": ["x3db"***REMOVED***, "model/x3d+vrml": ["*x3dv", "x3dvz"***REMOVED***, "model/x3d+xml": ["x3d", "x3dz"***REMOVED***, "model/x3d-vrml": ["x3dv"***REMOVED***, "text/cache-manifest": ["appcache", "manifest"***REMOVED***, "text/calendar": ["ics", "ifb"***REMOVED***, "text/coffeescript": ["coffee", "litcoffee"***REMOVED***, "text/css": ["css"***REMOVED***, "text/csv": ["csv"***REMOVED***, "text/html": ["html", "htm", "shtml"***REMOVED***, "text/jade": ["jade"***REMOVED***, "text/jsx": ["jsx"***REMOVED***, "text/less": ["less"***REMOVED***, "text/markdown": ["markdown", "md"***REMOVED***, "text/mathml": ["mml"***REMOVED***, "text/mdx": ["mdx"***REMOVED***, "text/n3": ["n3"***REMOVED***, "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"***REMOVED***, "text/richtext": ["rtx"***REMOVED***, "text/rtf": ["*rtf"***REMOVED***, "text/sgml": ["sgml", "sgm"***REMOVED***, "text/shex": ["shex"***REMOVED***, "text/slim": ["slim", "slm"***REMOVED***, "text/spdx": ["spdx"***REMOVED***, "text/stylus": ["stylus", "styl"***REMOVED***, "text/tab-separated-values": ["tsv"***REMOVED***, "text/troff": ["t", "tr", "roff", "man", "me", "ms"***REMOVED***, "text/turtle": ["ttl"***REMOVED***, "text/uri-list": ["uri", "uris", "urls"***REMOVED***, "text/vcard": ["vcard"***REMOVED***, "text/vtt": ["vtt"***REMOVED***, "text/xml": ["*xml"***REMOVED***, "text/yaml": ["yaml", "yml"***REMOVED***, "video/3gpp": ["3gp", "3gpp"***REMOVED***, "video/3gpp2": ["3g2"***REMOVED***, "video/h261": ["h261"***REMOVED***, "video/h263": ["h263"***REMOVED***, "video/h264": ["h264"***REMOVED***, "video/iso.segment": ["m4s"***REMOVED***, "video/jpeg": ["jpgv"***REMOVED***, "video/jpm": ["*jpm", "jpgm"***REMOVED***, "video/mj2": ["mj2", "mjp2"***REMOVED***, "video/mp2t": ["ts"***REMOVED***, "video/mp4": ["mp4", "mp4v", "mpg4"***REMOVED***, "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"***REMOVED***, "video/ogg": ["ogv"***REMOVED***, "video/quicktime": ["qt", "mov"***REMOVED***, "video/webm": ["webm"***REMOVED*** };
  }
});

// node_modules/@cloudflare/kv-asset-handler/node_modules/mime/types/other.js
var require_other = __commonJS({
  "node_modules/@cloudflare/kv-asset-handler/node_modules/mime/types/other.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = { "application/prs.cww": ["cww"***REMOVED***, "application/vnd.1000minds.decision-model+xml": ["1km"***REMOVED***, "application/vnd.3gpp.pic-bw-large": ["plb"***REMOVED***, "application/vnd.3gpp.pic-bw-small": ["psb"***REMOVED***, "application/vnd.3gpp.pic-bw-var": ["pvb"***REMOVED***, "application/vnd.3gpp2.tcap": ["tcap"***REMOVED***, "application/vnd.3m.post-it-notes": ["pwn"***REMOVED***, "application/vnd.accpac.simply.aso": ["aso"***REMOVED***, "application/vnd.accpac.simply.imp": ["imp"***REMOVED***, "application/vnd.acucobol": ["acu"***REMOVED***, "application/vnd.acucorp": ["atc", "acutc"***REMOVED***, "application/vnd.adobe.air-application-installer-package+zip": ["air"***REMOVED***, "application/vnd.adobe.formscentral.fcdt": ["fcdt"***REMOVED***, "application/vnd.adobe.fxp": ["fxp", "fxpl"***REMOVED***, "application/vnd.adobe.xdp+xml": ["xdp"***REMOVED***, "application/vnd.adobe.xfdf": ["xfdf"***REMOVED***, "application/vnd.ahead.space": ["ahead"***REMOVED***, "application/vnd.airzip.filesecure.azf": ["azf"***REMOVED***, "application/vnd.airzip.filesecure.azs": ["azs"***REMOVED***, "application/vnd.amazon.ebook": ["azw"***REMOVED***, "application/vnd.americandynamics.acc": ["acc"***REMOVED***, "application/vnd.amiga.ami": ["ami"***REMOVED***, "application/vnd.android.package-archive": ["apk"***REMOVED***, "application/vnd.anser-web-certificate-issue-initiation": ["cii"***REMOVED***, "application/vnd.anser-web-funds-transfer-initiation": ["fti"***REMOVED***, "application/vnd.antix.game-component": ["atx"***REMOVED***, "application/vnd.apple.installer+xml": ["mpkg"***REMOVED***, "application/vnd.apple.keynote": ["key"***REMOVED***, "application/vnd.apple.mpegurl": ["m3u8"***REMOVED***, "application/vnd.apple.numbers": ["numbers"***REMOVED***, "application/vnd.apple.pages": ["pages"***REMOVED***, "application/vnd.apple.pkpass": ["pkpass"***REMOVED***, "application/vnd.aristanetworks.swi": ["swi"***REMOVED***, "application/vnd.astraea-software.iota": ["iota"***REMOVED***, "application/vnd.audiograph": ["aep"***REMOVED***, "application/vnd.balsamiq.bmml+xml": ["bmml"***REMOVED***, "application/vnd.blueice.multipass": ["mpm"***REMOVED***, "application/vnd.bmi": ["bmi"***REMOVED***, "application/vnd.businessobjects": ["rep"***REMOVED***, "application/vnd.chemdraw+xml": ["cdxml"***REMOVED***, "application/vnd.chipnuts.karaoke-mmd": ["mmd"***REMOVED***, "application/vnd.cinderella": ["cdy"***REMOVED***, "application/vnd.citationstyles.style+xml": ["csl"***REMOVED***, "application/vnd.claymore": ["cla"***REMOVED***, "application/vnd.cloanto.rp9": ["rp9"***REMOVED***, "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"***REMOVED***, "application/vnd.cluetrust.cartomobile-config": ["c11amc"***REMOVED***, "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"***REMOVED***, "application/vnd.commonspace": ["csp"***REMOVED***, "application/vnd.contact.cmsg": ["cdbcmsg"***REMOVED***, "application/vnd.cosmocaller": ["cmc"***REMOVED***, "application/vnd.crick.clicker": ["clkx"***REMOVED***, "application/vnd.crick.clicker.keyboard": ["clkk"***REMOVED***, "application/vnd.crick.clicker.palette": ["clkp"***REMOVED***, "application/vnd.crick.clicker.template": ["clkt"***REMOVED***, "application/vnd.crick.clicker.wordbank": ["clkw"***REMOVED***, "application/vnd.criticaltools.wbs+xml": ["wbs"***REMOVED***, "application/vnd.ctc-posml": ["pml"***REMOVED***, "application/vnd.cups-ppd": ["ppd"***REMOVED***, "application/vnd.curl.car": ["car"***REMOVED***, "application/vnd.curl.pcurl": ["pcurl"***REMOVED***, "application/vnd.dart": ["dart"***REMOVED***, "application/vnd.data-vision.rdz": ["rdz"***REMOVED***, "application/vnd.dbf": ["dbf"***REMOVED***, "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"***REMOVED***, "application/vnd.dece.ttml+xml": ["uvt", "uvvt"***REMOVED***, "application/vnd.dece.unspecified": ["uvx", "uvvx"***REMOVED***, "application/vnd.dece.zip": ["uvz", "uvvz"***REMOVED***, "application/vnd.denovo.fcselayout-link": ["fe_launch"***REMOVED***, "application/vnd.dna": ["dna"***REMOVED***, "application/vnd.dolby.mlp": ["mlp"***REMOVED***, "application/vnd.dpgraph": ["dpg"***REMOVED***, "application/vnd.dreamfactory": ["dfac"***REMOVED***, "application/vnd.ds-keypoint": ["kpxx"***REMOVED***, "application/vnd.dvb.ait": ["ait"***REMOVED***, "application/vnd.dvb.service": ["svc"***REMOVED***, "application/vnd.dynageo": ["geo"***REMOVED***, "application/vnd.ecowin.chart": ["mag"***REMOVED***, "application/vnd.enliven": ["nml"***REMOVED***, "application/vnd.epson.esf": ["esf"***REMOVED***, "application/vnd.epson.msf": ["msf"***REMOVED***, "application/vnd.epson.quickanime": ["qam"***REMOVED***, "application/vnd.epson.salt": ["slt"***REMOVED***, "application/vnd.epson.ssf": ["ssf"***REMOVED***, "application/vnd.eszigno3+xml": ["es3", "et3"***REMOVED***, "application/vnd.ezpix-album": ["ez2"***REMOVED***, "application/vnd.ezpix-package": ["ez3"***REMOVED***, "application/vnd.fdf": ["fdf"***REMOVED***, "application/vnd.fdsn.mseed": ["mseed"***REMOVED***, "application/vnd.fdsn.seed": ["seed", "dataless"***REMOVED***, "application/vnd.flographit": ["gph"***REMOVED***, "application/vnd.fluxtime.clip": ["ftc"***REMOVED***, "application/vnd.framemaker": ["fm", "frame", "maker", "book"***REMOVED***, "application/vnd.frogans.fnc": ["fnc"***REMOVED***, "application/vnd.frogans.ltf": ["ltf"***REMOVED***, "application/vnd.fsc.weblaunch": ["fsc"***REMOVED***, "application/vnd.fujitsu.oasys": ["oas"***REMOVED***, "application/vnd.fujitsu.oasys2": ["oa2"***REMOVED***, "application/vnd.fujitsu.oasys3": ["oa3"***REMOVED***, "application/vnd.fujitsu.oasysgp": ["fg5"***REMOVED***, "application/vnd.fujitsu.oasysprs": ["bh2"***REMOVED***, "application/vnd.fujixerox.ddd": ["ddd"***REMOVED***, "application/vnd.fujixerox.docuworks": ["xdw"***REMOVED***, "application/vnd.fujixerox.docuworks.binder": ["xbd"***REMOVED***, "application/vnd.fuzzysheet": ["fzs"***REMOVED***, "application/vnd.genomatix.tuxedo": ["txd"***REMOVED***, "application/vnd.geogebra.file": ["ggb"***REMOVED***, "application/vnd.geogebra.tool": ["ggt"***REMOVED***, "application/vnd.geometry-explorer": ["gex", "gre"***REMOVED***, "application/vnd.geonext": ["gxt"***REMOVED***, "application/vnd.geoplan": ["g2w"***REMOVED***, "application/vnd.geospace": ["g3w"***REMOVED***, "application/vnd.gmx": ["gmx"***REMOVED***, "application/vnd.google-apps.document": ["gdoc"***REMOVED***, "application/vnd.google-apps.presentation": ["gslides"***REMOVED***, "application/vnd.google-apps.spreadsheet": ["gsheet"***REMOVED***, "application/vnd.google-earth.kml+xml": ["kml"***REMOVED***, "application/vnd.google-earth.kmz": ["kmz"***REMOVED***, "application/vnd.grafeq": ["gqf", "gqs"***REMOVED***, "application/vnd.groove-account": ["gac"***REMOVED***, "application/vnd.groove-help": ["ghf"***REMOVED***, "application/vnd.groove-identity-message": ["gim"***REMOVED***, "application/vnd.groove-injector": ["grv"***REMOVED***, "application/vnd.groove-tool-message": ["gtm"***REMOVED***, "application/vnd.groove-tool-template": ["tpl"***REMOVED***, "application/vnd.groove-vcard": ["vcg"***REMOVED***, "application/vnd.hal+xml": ["hal"***REMOVED***, "application/vnd.handheld-entertainment+xml": ["zmm"***REMOVED***, "application/vnd.hbci": ["hbci"***REMOVED***, "application/vnd.hhe.lesson-player": ["les"***REMOVED***, "application/vnd.hp-hpgl": ["hpgl"***REMOVED***, "application/vnd.hp-hpid": ["hpid"***REMOVED***, "application/vnd.hp-hps": ["hps"***REMOVED***, "application/vnd.hp-jlyt": ["jlt"***REMOVED***, "application/vnd.hp-pcl": ["pcl"***REMOVED***, "application/vnd.hp-pclxl": ["pclxl"***REMOVED***, "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"***REMOVED***, "application/vnd.ibm.minipay": ["mpy"***REMOVED***, "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"***REMOVED***, "application/vnd.ibm.rights-management": ["irm"***REMOVED***, "application/vnd.ibm.secure-container": ["sc"***REMOVED***, "application/vnd.iccprofile": ["icc", "icm"***REMOVED***, "application/vnd.igloader": ["igl"***REMOVED***, "application/vnd.immervision-ivp": ["ivp"***REMOVED***, "application/vnd.immervision-ivu": ["ivu"***REMOVED***, "application/vnd.insors.igm": ["igm"***REMOVED***, "application/vnd.intercon.formnet": ["xpw", "xpx"***REMOVED***, "application/vnd.intergeo": ["i2g"***REMOVED***, "application/vnd.intu.qbo": ["qbo"***REMOVED***, "application/vnd.intu.qfx": ["qfx"***REMOVED***, "application/vnd.ipunplugged.rcprofile": ["rcprofile"***REMOVED***, "application/vnd.irepository.package+xml": ["irp"***REMOVED***, "application/vnd.is-xpr": ["xpr"***REMOVED***, "application/vnd.isac.fcs": ["fcs"***REMOVED***, "application/vnd.jam": ["jam"***REMOVED***, "application/vnd.jcp.javame.midlet-rms": ["rms"***REMOVED***, "application/vnd.jisp": ["jisp"***REMOVED***, "application/vnd.joost.joda-archive": ["joda"***REMOVED***, "application/vnd.kahootz": ["ktz", "ktr"***REMOVED***, "application/vnd.kde.karbon": ["karbon"***REMOVED***, "application/vnd.kde.kchart": ["chrt"***REMOVED***, "application/vnd.kde.kformula": ["kfo"***REMOVED***, "application/vnd.kde.kivio": ["flw"***REMOVED***, "application/vnd.kde.kontour": ["kon"***REMOVED***, "application/vnd.kde.kpresenter": ["kpr", "kpt"***REMOVED***, "application/vnd.kde.kspread": ["ksp"***REMOVED***, "application/vnd.kde.kword": ["kwd", "kwt"***REMOVED***, "application/vnd.kenameaapp": ["htke"***REMOVED***, "application/vnd.kidspiration": ["kia"***REMOVED***, "application/vnd.kinar": ["kne", "knp"***REMOVED***, "application/vnd.koan": ["skp", "skd", "skt", "skm"***REMOVED***, "application/vnd.kodak-descriptor": ["sse"***REMOVED***, "application/vnd.las.las+xml": ["lasxml"***REMOVED***, "application/vnd.llamagraphics.life-balance.desktop": ["lbd"***REMOVED***, "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"***REMOVED***, "application/vnd.lotus-1-2-3": ["123"***REMOVED***, "application/vnd.lotus-approach": ["apr"***REMOVED***, "application/vnd.lotus-freelance": ["pre"***REMOVED***, "application/vnd.lotus-notes": ["nsf"***REMOVED***, "application/vnd.lotus-organizer": ["org"***REMOVED***, "application/vnd.lotus-screencam": ["scm"***REMOVED***, "application/vnd.lotus-wordpro": ["lwp"***REMOVED***, "application/vnd.macports.portpkg": ["portpkg"***REMOVED***, "application/vnd.mapbox-vector-tile": ["mvt"***REMOVED***, "application/vnd.mcd": ["mcd"***REMOVED***, "application/vnd.medcalcdata": ["mc1"***REMOVED***, "application/vnd.mediastation.cdkey": ["cdkey"***REMOVED***, "application/vnd.mfer": ["mwf"***REMOVED***, "application/vnd.mfmp": ["mfm"***REMOVED***, "application/vnd.micrografx.flo": ["flo"***REMOVED***, "application/vnd.micrografx.igx": ["igx"***REMOVED***, "application/vnd.mif": ["mif"***REMOVED***, "application/vnd.mobius.daf": ["daf"***REMOVED***, "application/vnd.mobius.dis": ["dis"***REMOVED***, "application/vnd.mobius.mbk": ["mbk"***REMOVED***, "application/vnd.mobius.mqy": ["mqy"***REMOVED***, "application/vnd.mobius.msl": ["msl"***REMOVED***, "application/vnd.mobius.plc": ["plc"***REMOVED***, "application/vnd.mobius.txf": ["txf"***REMOVED***, "application/vnd.mophun.application": ["mpn"***REMOVED***, "application/vnd.mophun.certificate": ["mpc"***REMOVED***, "application/vnd.mozilla.xul+xml": ["xul"***REMOVED***, "application/vnd.ms-artgalry": ["cil"***REMOVED***, "application/vnd.ms-cab-compressed": ["cab"***REMOVED***, "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"***REMOVED***, "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"***REMOVED***, "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"***REMOVED***, "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"***REMOVED***, "application/vnd.ms-excel.template.macroenabled.12": ["xltm"***REMOVED***, "application/vnd.ms-fontobject": ["eot"***REMOVED***, "application/vnd.ms-htmlhelp": ["chm"***REMOVED***, "application/vnd.ms-ims": ["ims"***REMOVED***, "application/vnd.ms-lrm": ["lrm"***REMOVED***, "application/vnd.ms-officetheme": ["thmx"***REMOVED***, "application/vnd.ms-outlook": ["msg"***REMOVED***, "application/vnd.ms-pki.seccat": ["cat"***REMOVED***, "application/vnd.ms-pki.stl": ["*stl"***REMOVED***, "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"***REMOVED***, "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"***REMOVED***, "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"***REMOVED***, "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"***REMOVED***, "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"***REMOVED***, "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"***REMOVED***, "application/vnd.ms-project": ["mpp", "mpt"***REMOVED***, "application/vnd.ms-word.document.macroenabled.12": ["docm"***REMOVED***, "application/vnd.ms-word.template.macroenabled.12": ["dotm"***REMOVED***, "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"***REMOVED***, "application/vnd.ms-wpl": ["wpl"***REMOVED***, "application/vnd.ms-xpsdocument": ["xps"***REMOVED***, "application/vnd.mseq": ["mseq"***REMOVED***, "application/vnd.musician": ["mus"***REMOVED***, "application/vnd.muvee.style": ["msty"***REMOVED***, "application/vnd.mynfc": ["taglet"***REMOVED***, "application/vnd.neurolanguage.nlu": ["nlu"***REMOVED***, "application/vnd.nitf": ["ntf", "nitf"***REMOVED***, "application/vnd.noblenet-directory": ["nnd"***REMOVED***, "application/vnd.noblenet-sealer": ["nns"***REMOVED***, "application/vnd.noblenet-web": ["nnw"***REMOVED***, "application/vnd.nokia.n-gage.ac+xml": ["*ac"***REMOVED***, "application/vnd.nokia.n-gage.data": ["ngdat"***REMOVED***, "application/vnd.nokia.n-gage.symbian.install": ["n-gage"***REMOVED***, "application/vnd.nokia.radio-preset": ["rpst"***REMOVED***, "application/vnd.nokia.radio-presets": ["rpss"***REMOVED***, "application/vnd.novadigm.edm": ["edm"***REMOVED***, "application/vnd.novadigm.edx": ["edx"***REMOVED***, "application/vnd.novadigm.ext": ["ext"***REMOVED***, "application/vnd.oasis.opendocument.chart": ["odc"***REMOVED***, "application/vnd.oasis.opendocument.chart-template": ["otc"***REMOVED***, "application/vnd.oasis.opendocument.database": ["odb"***REMOVED***, "application/vnd.oasis.opendocument.formula": ["odf"***REMOVED***, "application/vnd.oasis.opendocument.formula-template": ["odft"***REMOVED***, "application/vnd.oasis.opendocument.graphics": ["odg"***REMOVED***, "application/vnd.oasis.opendocument.graphics-template": ["otg"***REMOVED***, "application/vnd.oasis.opendocument.image": ["odi"***REMOVED***, "application/vnd.oasis.opendocument.image-template": ["oti"***REMOVED***, "application/vnd.oasis.opendocument.presentation": ["odp"***REMOVED***, "application/vnd.oasis.opendocument.presentation-template": ["otp"***REMOVED***, "application/vnd.oasis.opendocument.spreadsheet": ["ods"***REMOVED***, "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"***REMOVED***, "application/vnd.oasis.opendocument.text": ["odt"***REMOVED***, "application/vnd.oasis.opendocument.text-master": ["odm"***REMOVED***, "application/vnd.oasis.opendocument.text-template": ["ott"***REMOVED***, "application/vnd.oasis.opendocument.text-web": ["oth"***REMOVED***, "application/vnd.olpc-sugar": ["xo"***REMOVED***, "application/vnd.oma.dd2+xml": ["dd2"***REMOVED***, "application/vnd.openblox.game+xml": ["obgx"***REMOVED***, "application/vnd.openofficeorg.extension": ["oxt"***REMOVED***, "application/vnd.openstreetmap.data+xml": ["osm"***REMOVED***, "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"***REMOVED***, "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"***REMOVED***, "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"***REMOVED***, "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"***REMOVED***, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"***REMOVED***, "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"***REMOVED***, "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"***REMOVED***, "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"***REMOVED***, "application/vnd.osgeo.mapguide.package": ["mgp"***REMOVED***, "application/vnd.osgi.dp": ["dp"***REMOVED***, "application/vnd.osgi.subsystem": ["esa"***REMOVED***, "application/vnd.palm": ["pdb", "pqa", "oprc"***REMOVED***, "application/vnd.pawaafile": ["paw"***REMOVED***, "application/vnd.pg.format": ["str"***REMOVED***, "application/vnd.pg.osasli": ["ei6"***REMOVED***, "application/vnd.picsel": ["efif"***REMOVED***, "application/vnd.pmi.widget": ["wg"***REMOVED***, "application/vnd.pocketlearn": ["plf"***REMOVED***, "application/vnd.powerbuilder6": ["pbd"***REMOVED***, "application/vnd.previewsystems.box": ["box"***REMOVED***, "application/vnd.proteus.magazine": ["mgz"***REMOVED***, "application/vnd.publishare-delta-tree": ["qps"***REMOVED***, "application/vnd.pvi.ptid1": ["ptid"***REMOVED***, "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"***REMOVED***, "application/vnd.rar": ["rar"***REMOVED***, "application/vnd.realvnc.bed": ["bed"***REMOVED***, "application/vnd.recordare.musicxml": ["mxl"***REMOVED***, "application/vnd.recordare.musicxml+xml": ["musicxml"***REMOVED***, "application/vnd.rig.cryptonote": ["cryptonote"***REMOVED***, "application/vnd.rim.cod": ["cod"***REMOVED***, "application/vnd.rn-realmedia": ["rm"***REMOVED***, "application/vnd.rn-realmedia-vbr": ["rmvb"***REMOVED***, "application/vnd.route66.link66+xml": ["link66"***REMOVED***, "application/vnd.sailingtracker.track": ["st"***REMOVED***, "application/vnd.seemail": ["see"***REMOVED***, "application/vnd.sema": ["sema"***REMOVED***, "application/vnd.semd": ["semd"***REMOVED***, "application/vnd.semf": ["semf"***REMOVED***, "application/vnd.shana.informed.formdata": ["ifm"***REMOVED***, "application/vnd.shana.informed.formtemplate": ["itp"***REMOVED***, "application/vnd.shana.informed.interchange": ["iif"***REMOVED***, "application/vnd.shana.informed.package": ["ipk"***REMOVED***, "application/vnd.simtech-mindmapper": ["twd", "twds"***REMOVED***, "application/vnd.smaf": ["mmf"***REMOVED***, "application/vnd.smart.teacher": ["teacher"***REMOVED***, "application/vnd.software602.filler.form+xml": ["fo"***REMOVED***, "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"***REMOVED***, "application/vnd.spotfire.dxp": ["dxp"***REMOVED***, "application/vnd.spotfire.sfs": ["sfs"***REMOVED***, "application/vnd.stardivision.calc": ["sdc"***REMOVED***, "application/vnd.stardivision.draw": ["sda"***REMOVED***, "application/vnd.stardivision.impress": ["sdd"***REMOVED***, "application/vnd.stardivision.math": ["smf"***REMOVED***, "application/vnd.stardivision.writer": ["sdw", "vor"***REMOVED***, "application/vnd.stardivision.writer-global": ["sgl"***REMOVED***, "application/vnd.stepmania.package": ["smzip"***REMOVED***, "application/vnd.stepmania.stepchart": ["sm"***REMOVED***, "application/vnd.sun.wadl+xml": ["wadl"***REMOVED***, "application/vnd.sun.xml.calc": ["sxc"***REMOVED***, "application/vnd.sun.xml.calc.template": ["stc"***REMOVED***, "application/vnd.sun.xml.draw": ["sxd"***REMOVED***, "application/vnd.sun.xml.draw.template": ["std"***REMOVED***, "application/vnd.sun.xml.impress": ["sxi"***REMOVED***, "application/vnd.sun.xml.impress.template": ["sti"***REMOVED***, "application/vnd.sun.xml.math": ["sxm"***REMOVED***, "application/vnd.sun.xml.writer": ["sxw"***REMOVED***, "application/vnd.sun.xml.writer.global": ["sxg"***REMOVED***, "application/vnd.sun.xml.writer.template": ["stw"***REMOVED***, "application/vnd.sus-calendar": ["sus", "susp"***REMOVED***, "application/vnd.svd": ["svd"***REMOVED***, "application/vnd.symbian.install": ["sis", "sisx"***REMOVED***, "application/vnd.syncml+xml": ["xsm"***REMOVED***, "application/vnd.syncml.dm+wbxml": ["bdm"***REMOVED***, "application/vnd.syncml.dm+xml": ["xdm"***REMOVED***, "application/vnd.syncml.dmddf+xml": ["ddf"***REMOVED***, "application/vnd.tao.intent-module-archive": ["tao"***REMOVED***, "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"***REMOVED***, "application/vnd.tmobile-livetv": ["tmo"***REMOVED***, "application/vnd.trid.tpt": ["tpt"***REMOVED***, "application/vnd.triscape.mxs": ["mxs"***REMOVED***, "application/vnd.trueapp": ["tra"***REMOVED***, "application/vnd.ufdl": ["ufd", "ufdl"***REMOVED***, "application/vnd.uiq.theme": ["utz"***REMOVED***, "application/vnd.umajin": ["umj"***REMOVED***, "application/vnd.unity": ["unityweb"***REMOVED***, "application/vnd.uoml+xml": ["uoml"***REMOVED***, "application/vnd.vcx": ["vcx"***REMOVED***, "application/vnd.visio": ["vsd", "vst", "vss", "vsw"***REMOVED***, "application/vnd.visionary": ["vis"***REMOVED***, "application/vnd.vsf": ["vsf"***REMOVED***, "application/vnd.wap.wbxml": ["wbxml"***REMOVED***, "application/vnd.wap.wmlc": ["wmlc"***REMOVED***, "application/vnd.wap.wmlscriptc": ["wmlsc"***REMOVED***, "application/vnd.webturbo": ["wtb"***REMOVED***, "application/vnd.wolfram.player": ["nbp"***REMOVED***, "application/vnd.wordperfect": ["wpd"***REMOVED***, "application/vnd.wqd": ["wqd"***REMOVED***, "application/vnd.wt.stf": ["stf"***REMOVED***, "application/vnd.xara": ["xar"***REMOVED***, "application/vnd.xfdl": ["xfdl"***REMOVED***, "application/vnd.yamaha.hv-dic": ["hvd"***REMOVED***, "application/vnd.yamaha.hv-script": ["hvs"***REMOVED***, "application/vnd.yamaha.hv-voice": ["hvp"***REMOVED***, "application/vnd.yamaha.openscoreformat": ["osf"***REMOVED***, "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"***REMOVED***, "application/vnd.yamaha.smaf-audio": ["saf"***REMOVED***, "application/vnd.yamaha.smaf-phrase": ["spf"***REMOVED***, "application/vnd.yellowriver-custom-menu": ["cmp"***REMOVED***, "application/vnd.zul": ["zir", "zirz"***REMOVED***, "application/vnd.zzazz.deck+xml": ["zaz"***REMOVED***, "application/x-7z-compressed": ["7z"***REMOVED***, "application/x-abiword": ["abw"***REMOVED***, "application/x-ace-compressed": ["ace"***REMOVED***, "application/x-apple-diskimage": ["*dmg"***REMOVED***, "application/x-arj": ["arj"***REMOVED***, "application/x-authorware-bin": ["aab", "x32", "u32", "vox"***REMOVED***, "application/x-authorware-map": ["aam"***REMOVED***, "application/x-authorware-seg": ["aas"***REMOVED***, "application/x-bcpio": ["bcpio"***REMOVED***, "application/x-bdoc": ["*bdoc"***REMOVED***, "application/x-bittorrent": ["torrent"***REMOVED***, "application/x-blorb": ["blb", "blorb"***REMOVED***, "application/x-bzip": ["bz"***REMOVED***, "application/x-bzip2": ["bz2", "boz"***REMOVED***, "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"***REMOVED***, "application/x-cdlink": ["vcd"***REMOVED***, "application/x-cfs-compressed": ["cfs"***REMOVED***, "application/x-chat": ["chat"***REMOVED***, "application/x-chess-pgn": ["pgn"***REMOVED***, "application/x-chrome-extension": ["crx"***REMOVED***, "application/x-cocoa": ["cco"***REMOVED***, "application/x-conference": ["nsc"***REMOVED***, "application/x-cpio": ["cpio"***REMOVED***, "application/x-csh": ["csh"***REMOVED***, "application/x-debian-package": ["*deb", "udeb"***REMOVED***, "application/x-dgc-compressed": ["dgc"***REMOVED***, "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"***REMOVED***, "application/x-doom": ["wad"***REMOVED***, "application/x-dtbncx+xml": ["ncx"***REMOVED***, "application/x-dtbook+xml": ["dtb"***REMOVED***, "application/x-dtbresource+xml": ["res"***REMOVED***, "application/x-dvi": ["dvi"***REMOVED***, "application/x-envoy": ["evy"***REMOVED***, "application/x-eva": ["eva"***REMOVED***, "application/x-font-bdf": ["bdf"***REMOVED***, "application/x-font-ghostscript": ["gsf"***REMOVED***, "application/x-font-linux-psf": ["psf"***REMOVED***, "application/x-font-pcf": ["pcf"***REMOVED***, "application/x-font-snf": ["snf"***REMOVED***, "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"***REMOVED***, "application/x-freearc": ["arc"***REMOVED***, "application/x-futuresplash": ["spl"***REMOVED***, "application/x-gca-compressed": ["gca"***REMOVED***, "application/x-glulx": ["ulx"***REMOVED***, "application/x-gnumeric": ["gnumeric"***REMOVED***, "application/x-gramps-xml": ["gramps"***REMOVED***, "application/x-gtar": ["gtar"***REMOVED***, "application/x-hdf": ["hdf"***REMOVED***, "application/x-httpd-php": ["php"***REMOVED***, "application/x-install-instructions": ["install"***REMOVED***, "application/x-iso9660-image": ["*iso"***REMOVED***, "application/x-iwork-keynote-sffkey": ["*key"***REMOVED***, "application/x-iwork-numbers-sffnumbers": ["*numbers"***REMOVED***, "application/x-iwork-pages-sffpages": ["*pages"***REMOVED***, "application/x-java-archive-diff": ["jardiff"***REMOVED***, "application/x-java-jnlp-file": ["jnlp"***REMOVED***, "application/x-keepass2": ["kdbx"***REMOVED***, "application/x-latex": ["latex"***REMOVED***, "application/x-lua-bytecode": ["luac"***REMOVED***, "application/x-lzh-compressed": ["lzh", "lha"***REMOVED***, "application/x-makeself": ["run"***REMOVED***, "application/x-mie": ["mie"***REMOVED***, "application/x-mobipocket-ebook": ["prc", "mobi"***REMOVED***, "application/x-ms-application": ["application"***REMOVED***, "application/x-ms-shortcut": ["lnk"***REMOVED***, "application/x-ms-wmd": ["wmd"***REMOVED***, "application/x-ms-wmz": ["wmz"***REMOVED***, "application/x-ms-xbap": ["xbap"***REMOVED***, "application/x-msaccess": ["mdb"***REMOVED***, "application/x-msbinder": ["obd"***REMOVED***, "application/x-mscardfile": ["crd"***REMOVED***, "application/x-msclip": ["clp"***REMOVED***, "application/x-msdos-program": ["*exe"***REMOVED***, "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"***REMOVED***, "application/x-msmediaview": ["mvb", "m13", "m14"***REMOVED***, "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"***REMOVED***, "application/x-msmoney": ["mny"***REMOVED***, "application/x-mspublisher": ["pub"***REMOVED***, "application/x-msschedule": ["scd"***REMOVED***, "application/x-msterminal": ["trm"***REMOVED***, "application/x-mswrite": ["wri"***REMOVED***, "application/x-netcdf": ["nc", "cdf"***REMOVED***, "application/x-ns-proxy-autoconfig": ["pac"***REMOVED***, "application/x-nzb": ["nzb"***REMOVED***, "application/x-perl": ["pl", "pm"***REMOVED***, "application/x-pilot": ["*prc", "*pdb"***REMOVED***, "application/x-pkcs12": ["p12", "pfx"***REMOVED***, "application/x-pkcs7-certificates": ["p7b", "spc"***REMOVED***, "application/x-pkcs7-certreqresp": ["p7r"***REMOVED***, "application/x-rar-compressed": ["*rar"***REMOVED***, "application/x-redhat-package-manager": ["rpm"***REMOVED***, "application/x-research-info-systems": ["ris"***REMOVED***, "application/x-sea": ["sea"***REMOVED***, "application/x-sh": ["sh"***REMOVED***, "application/x-shar": ["shar"***REMOVED***, "application/x-shockwave-flash": ["swf"***REMOVED***, "application/x-silverlight-app": ["xap"***REMOVED***, "application/x-sql": ["sql"***REMOVED***, "application/x-stuffit": ["sit"***REMOVED***, "application/x-stuffitx": ["sitx"***REMOVED***, "application/x-subrip": ["srt"***REMOVED***, "application/x-sv4cpio": ["sv4cpio"***REMOVED***, "application/x-sv4crc": ["sv4crc"***REMOVED***, "application/x-t3vm-image": ["t3"***REMOVED***, "application/x-tads": ["gam"***REMOVED***, "application/x-tar": ["tar"***REMOVED***, "application/x-tcl": ["tcl", "tk"***REMOVED***, "application/x-tex": ["tex"***REMOVED***, "application/x-tex-tfm": ["tfm"***REMOVED***, "application/x-texinfo": ["texinfo", "texi"***REMOVED***, "application/x-tgif": ["*obj"***REMOVED***, "application/x-ustar": ["ustar"***REMOVED***, "application/x-virtualbox-hdd": ["hdd"***REMOVED***, "application/x-virtualbox-ova": ["ova"***REMOVED***, "application/x-virtualbox-ovf": ["ovf"***REMOVED***, "application/x-virtualbox-vbox": ["vbox"***REMOVED***, "application/x-virtualbox-vbox-extpack": ["vbox-extpack"***REMOVED***, "application/x-virtualbox-vdi": ["vdi"***REMOVED***, "application/x-virtualbox-vhd": ["vhd"***REMOVED***, "application/x-virtualbox-vmdk": ["vmdk"***REMOVED***, "application/x-wais-source": ["src"***REMOVED***, "application/x-web-app-manifest+json": ["webapp"***REMOVED***, "application/x-x509-ca-cert": ["der", "crt", "pem"***REMOVED***, "application/x-xfig": ["fig"***REMOVED***, "application/x-xliff+xml": ["*xlf"***REMOVED***, "application/x-xpinstall": ["xpi"***REMOVED***, "application/x-xz": ["xz"***REMOVED***, "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"***REMOVED***, "audio/vnd.dece.audio": ["uva", "uvva"***REMOVED***, "audio/vnd.digital-winds": ["eol"***REMOVED***, "audio/vnd.dra": ["dra"***REMOVED***, "audio/vnd.dts": ["dts"***REMOVED***, "audio/vnd.dts.hd": ["dtshd"***REMOVED***, "audio/vnd.lucent.voice": ["lvp"***REMOVED***, "audio/vnd.ms-playready.media.pya": ["pya"***REMOVED***, "audio/vnd.nuera.ecelp4800": ["ecelp4800"***REMOVED***, "audio/vnd.nuera.ecelp7470": ["ecelp7470"***REMOVED***, "audio/vnd.nuera.ecelp9600": ["ecelp9600"***REMOVED***, "audio/vnd.rip": ["rip"***REMOVED***, "audio/x-aac": ["aac"***REMOVED***, "audio/x-aiff": ["aif", "aiff", "aifc"***REMOVED***, "audio/x-caf": ["caf"***REMOVED***, "audio/x-flac": ["flac"***REMOVED***, "audio/x-m4a": ["*m4a"***REMOVED***, "audio/x-matroska": ["mka"***REMOVED***, "audio/x-mpegurl": ["m3u"***REMOVED***, "audio/x-ms-wax": ["wax"***REMOVED***, "audio/x-ms-wma": ["wma"***REMOVED***, "audio/x-pn-realaudio": ["ram", "ra"***REMOVED***, "audio/x-pn-realaudio-plugin": ["rmp"***REMOVED***, "audio/x-realaudio": ["*ra"***REMOVED***, "audio/x-wav": ["*wav"***REMOVED***, "chemical/x-cdx": ["cdx"***REMOVED***, "chemical/x-cif": ["cif"***REMOVED***, "chemical/x-cmdf": ["cmdf"***REMOVED***, "chemical/x-cml": ["cml"***REMOVED***, "chemical/x-csml": ["csml"***REMOVED***, "chemical/x-xyz": ["xyz"***REMOVED***, "image/prs.btif": ["btif"***REMOVED***, "image/prs.pti": ["pti"***REMOVED***, "image/vnd.adobe.photoshop": ["psd"***REMOVED***, "image/vnd.airzip.accelerator.azv": ["azv"***REMOVED***, "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"***REMOVED***, "image/vnd.djvu": ["djvu", "djv"***REMOVED***, "image/vnd.dvb.subtitle": ["*sub"***REMOVED***, "image/vnd.dwg": ["dwg"***REMOVED***, "image/vnd.dxf": ["dxf"***REMOVED***, "image/vnd.fastbidsheet": ["fbs"***REMOVED***, "image/vnd.fpx": ["fpx"***REMOVED***, "image/vnd.fst": ["fst"***REMOVED***, "image/vnd.fujixerox.edmics-mmr": ["mmr"***REMOVED***, "image/vnd.fujixerox.edmics-rlc": ["rlc"***REMOVED***, "image/vnd.microsoft.icon": ["ico"***REMOVED***, "image/vnd.ms-dds": ["dds"***REMOVED***, "image/vnd.ms-modi": ["mdi"***REMOVED***, "image/vnd.ms-photo": ["wdp"***REMOVED***, "image/vnd.net-fpx": ["npx"***REMOVED***, "image/vnd.pco.b16": ["b16"***REMOVED***, "image/vnd.tencent.tap": ["tap"***REMOVED***, "image/vnd.valve.source.texture": ["vtf"***REMOVED***, "image/vnd.wap.wbmp": ["wbmp"***REMOVED***, "image/vnd.xiff": ["xif"***REMOVED***, "image/vnd.zbrush.pcx": ["pcx"***REMOVED***, "image/x-3ds": ["3ds"***REMOVED***, "image/x-cmu-raster": ["ras"***REMOVED***, "image/x-cmx": ["cmx"***REMOVED***, "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"***REMOVED***, "image/x-icon": ["*ico"***REMOVED***, "image/x-jng": ["jng"***REMOVED***, "image/x-mrsid-image": ["sid"***REMOVED***, "image/x-ms-bmp": ["*bmp"***REMOVED***, "image/x-pcx": ["*pcx"***REMOVED***, "image/x-pict": ["pic", "pct"***REMOVED***, "image/x-portable-anymap": ["pnm"***REMOVED***, "image/x-portable-bitmap": ["pbm"***REMOVED***, "image/x-portable-graymap": ["pgm"***REMOVED***, "image/x-portable-pixmap": ["ppm"***REMOVED***, "image/x-rgb": ["rgb"***REMOVED***, "image/x-tga": ["tga"***REMOVED***, "image/x-xbitmap": ["xbm"***REMOVED***, "image/x-xpixmap": ["xpm"***REMOVED***, "image/x-xwindowdump": ["xwd"***REMOVED***, "message/vnd.wfa.wsc": ["wsc"***REMOVED***, "model/vnd.collada+xml": ["dae"***REMOVED***, "model/vnd.dwf": ["dwf"***REMOVED***, "model/vnd.gdl": ["gdl"***REMOVED***, "model/vnd.gtw": ["gtw"***REMOVED***, "model/vnd.mts": ["mts"***REMOVED***, "model/vnd.opengex": ["ogex"***REMOVED***, "model/vnd.parasolid.transmit.binary": ["x_b"***REMOVED***, "model/vnd.parasolid.transmit.text": ["x_t"***REMOVED***, "model/vnd.sap.vds": ["vds"***REMOVED***, "model/vnd.usdz+zip": ["usdz"***REMOVED***, "model/vnd.valve.source.compiled-map": ["bsp"***REMOVED***, "model/vnd.vtu": ["vtu"***REMOVED***, "text/prs.lines.tag": ["dsc"***REMOVED***, "text/vnd.curl": ["curl"***REMOVED***, "text/vnd.curl.dcurl": ["dcurl"***REMOVED***, "text/vnd.curl.mcurl": ["mcurl"***REMOVED***, "text/vnd.curl.scurl": ["scurl"***REMOVED***, "text/vnd.dvb.subtitle": ["sub"***REMOVED***, "text/vnd.fly": ["fly"***REMOVED***, "text/vnd.fmi.flexstor": ["flx"***REMOVED***, "text/vnd.graphviz": ["gv"***REMOVED***, "text/vnd.in3d.3dml": ["3dml"***REMOVED***, "text/vnd.in3d.spot": ["spot"***REMOVED***, "text/vnd.sun.j2me.app-descriptor": ["jad"***REMOVED***, "text/vnd.wap.wml": ["wml"***REMOVED***, "text/vnd.wap.wmlscript": ["wmls"***REMOVED***, "text/x-asm": ["s", "asm"***REMOVED***, "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"***REMOVED***, "text/x-component": ["htc"***REMOVED***, "text/x-fortran": ["f", "for", "f77", "f90"***REMOVED***, "text/x-handlebars-template": ["hbs"***REMOVED***, "text/x-java-source": ["java"***REMOVED***, "text/x-lua": ["lua"***REMOVED***, "text/x-markdown": ["mkd"***REMOVED***, "text/x-nfo": ["nfo"***REMOVED***, "text/x-opml": ["opml"***REMOVED***, "text/x-org": ["*org"***REMOVED***, "text/x-pascal": ["p", "pas"***REMOVED***, "text/x-processing": ["pde"***REMOVED***, "text/x-sass": ["sass"***REMOVED***, "text/x-scss": ["scss"***REMOVED***, "text/x-setext": ["etx"***REMOVED***, "text/x-sfv": ["sfv"***REMOVED***, "text/x-suse-ymp": ["ymp"***REMOVED***, "text/x-uuencode": ["uu"***REMOVED***, "text/x-vcalendar": ["vcs"***REMOVED***, "text/x-vcard": ["vcf"***REMOVED***, "video/vnd.dece.hd": ["uvh", "uvvh"***REMOVED***, "video/vnd.dece.mobile": ["uvm", "uvvm"***REMOVED***, "video/vnd.dece.pd": ["uvp", "uvvp"***REMOVED***, "video/vnd.dece.sd": ["uvs", "uvvs"***REMOVED***, "video/vnd.dece.video": ["uvv", "uvvv"***REMOVED***, "video/vnd.dvb.file": ["dvb"***REMOVED***, "video/vnd.fvt": ["fvt"***REMOVED***, "video/vnd.mpegurl": ["mxu", "m4u"***REMOVED***, "video/vnd.ms-playready.media.pyv": ["pyv"***REMOVED***, "video/vnd.uvvu.mp4": ["uvu", "uvvu"***REMOVED***, "video/vnd.vivo": ["viv"***REMOVED***, "video/x-f4v": ["f4v"***REMOVED***, "video/x-fli": ["fli"***REMOVED***, "video/x-flv": ["flv"***REMOVED***, "video/x-m4v": ["m4v"***REMOVED***, "video/x-matroska": ["mkv", "mk3d", "mks"***REMOVED***, "video/x-mng": ["mng"***REMOVED***, "video/x-ms-asf": ["asf", "asx"***REMOVED***, "video/x-ms-vob": ["vob"***REMOVED***, "video/x-ms-wm": ["wm"***REMOVED***, "video/x-ms-wmv": ["wmv"***REMOVED***, "video/x-ms-wmx": ["wmx"***REMOVED***, "video/x-ms-wvx": ["wvx"***REMOVED***, "video/x-msvideo": ["avi"***REMOVED***, "video/x-sgi-movie": ["movie"***REMOVED***, "video/x-smv": ["smv"***REMOVED***, "x-conference/x-cooltalk": ["ice"***REMOVED*** };
  }
});

// node_modules/@cloudflare/kv-asset-handler/node_modules/mime/index.js
var require_mime = __commonJS({
  "node_modules/@cloudflare/kv-asset-handler/node_modules/mime/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// node_modules/@cloudflare/kv-asset-handler/dist/types.js
var require_types = __commonJS({
  "node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.KVError = void 0;
    var KVError = class extends Error {
      constructor(message, status = 500) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = KVError.name;
        this.status = status;
      }
      status;
    };
    __name(KVError, "KVError");
    exports.KVError = KVError;
    var MethodNotAllowedError = class extends KVError {
      constructor(message = `Not a valid request method`, status = 405) {
        super(message, status);
      }
    };
    __name(MethodNotAllowedError, "MethodNotAllowedError");
    exports.MethodNotAllowedError = MethodNotAllowedError;
    var NotFoundError = class extends KVError {
      constructor(message = `Not Found`, status = 404) {
        super(message, status);
      }
    };
    __name(NotFoundError, "NotFoundError");
    exports.NotFoundError = NotFoundError;
    var InternalError = class extends KVError {
      constructor(message = `Internal Error in KV Asset Handler`, status = 500) {
        super(message, status);
      }
    };
    __name(InternalError, "InternalError");
    exports.InternalError = InternalError;
  }
});

// node_modules/@cloudflare/kv-asset-handler/dist/index.js
var require_dist = __commonJS({
  "node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k***REMOVED***;
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2***REMOVED*** = m[k***REMOVED***;
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"***REMOVED*** = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;
    var mime = __importStar(require_mime());
    var types_1 = require_types();
    Object.defineProperty(exports, "InternalError", { enumerable: true, get: function() {
      return types_1.InternalError;
    } });
    Object.defineProperty(exports, "MethodNotAllowedError", { enumerable: true, get: function() {
      return types_1.MethodNotAllowedError;
    } });
    Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
      return types_1.NotFoundError;
    } });
    var defaultCacheControl = {
      browserTTL: null,
      edgeTTL: 2 * 60 * 60 * 24,
      // 2 days
      bypassCache: false
      // do not bypass Cloudflare's cache
    };
    var parseStringAsObject = /* @__PURE__ */ __name((maybeString) => typeof maybeString === "string" ? JSON.parse(maybeString) : maybeString, "parseStringAsObject");
    var getAssetFromKVDefaultOptions = {
      ASSET_NAMESPACE: typeof __STATIC_CONTENT !== "undefined" ? __STATIC_CONTENT : void 0,
      ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== "undefined" ? parseStringAsObject(__STATIC_CONTENT_MANIFEST) : {},
      cacheControl: defaultCacheControl,
      defaultMimeType: "text/plain",
      defaultDocument: "index.html",
      pathIsEncoded: false,
      defaultETag: "strong"
    };
    function assignOptions(options) {
      return Object.assign({}, getAssetFromKVDefaultOptions, options);
    }
    __name(assignOptions, "assignOptions");
    var mapRequestToAsset = /* @__PURE__ */ __name((request, options) => {
      options = assignOptions(options);
      const parsedUrl = new URL(request.url);
      let pathname = parsedUrl.pathname;
      if (pathname.endsWith("/")) {
        pathname = pathname.concat(options.defaultDocument);
      } else if (!mime.getType(pathname)) {
        pathname = pathname.concat("/" + options.defaultDocument);
      }
      parsedUrl.pathname = pathname;
      return new Request(parsedUrl.toString(), request);
    }, "mapRequestToAsset");
    exports.mapRequestToAsset = mapRequestToAsset;
    function serveSinglePageApp(request, options) {
      options = assignOptions(options);
      request = mapRequestToAsset(request, options);
      const parsedUrl = new URL(request.url);
      if (parsedUrl.pathname.endsWith(".html")) {
        return new Request(`${parsedUrl.origin}/${options.defaultDocument}`, request);
      } else {
        return request;
      }
    }
    __name(serveSinglePageApp, "serveSinglePageApp");
    exports.serveSinglePageApp = serveSinglePageApp;
    var getAssetFromKV2 = /* @__PURE__ */ __name(async (event, options) => {
      options = assignOptions(options);
      const request = event.request;
      const ASSET_NAMESPACE = options.ASSET_NAMESPACE;
      const ASSET_MANIFEST = parseStringAsObject(options.ASSET_MANIFEST);
      if (typeof ASSET_NAMESPACE === "undefined") {
        throw new types_1.InternalError(`there is no KV namespace bound to the script`);
      }
      const rawPathKey = new URL(request.url).pathname.replace(/^\/+/, "");
      let pathIsEncoded = options.pathIsEncoded;
      let requestKey;
      if (options.mapRequestToAsset) {
        requestKey = options.mapRequestToAsset(request);
      } else if (ASSET_MANIFEST[rawPathKey***REMOVED***) {
        requestKey = request;
      } else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)***REMOVED***) {
        pathIsEncoded = true;
        requestKey = request;
      } else {
        const mappedRequest = mapRequestToAsset(request);
        const mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, "");
        if (ASSET_MANIFEST[decodeURIComponent(mappedRawPathKey)***REMOVED***) {
          pathIsEncoded = true;
          requestKey = mappedRequest;
        } else {
          requestKey = mapRequestToAsset(request, options);
        }
      }
      const SUPPORTED_METHODS = ["GET", "HEAD"***REMOVED***;
      if (!SUPPORTED_METHODS.includes(requestKey.method)) {
        throw new types_1.MethodNotAllowedError(`${requestKey.method} is not a valid request method`);
      }
      const parsedUrl = new URL(requestKey.url);
      const pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname;
      let pathKey = pathname.replace(/^\/+/, "");
      const cache = caches.default;
      let mimeType = mime.getType(pathKey) || options.defaultMimeType;
      if (mimeType.startsWith("text") || mimeType === "application/javascript") {
        mimeType += "; charset=utf-8";
      }
      let shouldEdgeCache = false;
      if (typeof ASSET_MANIFEST !== "undefined") {
        if (ASSET_MANIFEST[pathKey***REMOVED***) {
          pathKey = ASSET_MANIFEST[pathKey***REMOVED***;
          shouldEdgeCache = true;
        }
      }
      const cacheKey = new Request(`${parsedUrl.origin}/${pathKey}`, request);
      const evalCacheOpts = (() => {
        switch (typeof options.cacheControl) {
          case "function":
            return options.cacheControl(request);
          case "object":
            return options.cacheControl;
          default:
            return defaultCacheControl;
        }
      })();
      const formatETag = /* @__PURE__ */ __name((entityId = pathKey, validatorType = options.defaultETag) => {
        if (!entityId) {
          return "";
        }
        switch (validatorType) {
          case "weak":
            if (!entityId.startsWith("W/")) {
              if (entityId.startsWith(`"`) && entityId.endsWith(`"`)) {
                return `W/${entityId}`;
              }
              return `W/"${entityId}"`;
            }
            return entityId;
          case "strong":
            if (entityId.startsWith(`W/"`)) {
              entityId = entityId.replace("W/", "");
            }
            if (!entityId.endsWith(`"`)) {
              entityId = `"${entityId}"`;
            }
            return entityId;
          default:
            return "";
        }
      }, "formatETag");
      options.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts);
      if (options.cacheControl.bypassCache || options.cacheControl.edgeTTL === null || request.method == "HEAD") {
        shouldEdgeCache = false;
      }
      const shouldSetBrowserCache = typeof options.cacheControl.browserTTL === "number";
      let response = null;
      if (shouldEdgeCache) {
        response = await cache.match(cacheKey);
      }
      if (response) {
        if (response.status > 300 && response.status < 400) {
          if (response.body && "cancel" in Object.getPrototypeOf(response.body)) {
            response.body.cancel();
          } else {
          }
          response = new Response(null, response);
        } else {
          const opts = {
            headers: new Headers(response.headers),
            status: 0,
            statusText: ""
          };
          opts.headers.set("cf-cache-status", "HIT");
          if (response.status) {
            opts.status = response.status;
            opts.statusText = response.statusText;
          } else if (opts.headers.has("Content-Range")) {
            opts.status = 206;
            opts.statusText = "Partial Content";
          } else {
            opts.status = 200;
            opts.statusText = "OK";
          }
          response = new Response(response.body, opts);
        }
      } else {
        const body = await ASSET_NAMESPACE.get(pathKey, "arrayBuffer");
        if (body === null) {
          throw new types_1.NotFoundError(`could not find ${pathKey} in your content namespace`);
        }
        response = new Response(body);
        if (shouldEdgeCache) {
          response.headers.set("Accept-Ranges", "bytes");
          response.headers.set("Content-Length", String(body.byteLength));
          if (!response.headers.has("etag")) {
            response.headers.set("etag", formatETag(pathKey));
          }
          response.headers.set("Cache-Control", `max-age=${options.cacheControl.edgeTTL}`);
          event.waitUntil(cache.put(cacheKey, response.clone()));
          response.headers.set("CF-Cache-Status", "MISS");
        }
      }
      response.headers.set("Content-Type", mimeType);
      if (response.status === 304) {
        const etag = formatETag(response.headers.get("etag"));
        const ifNoneMatch = cacheKey.headers.get("if-none-match");
        const proxyCacheStatus = response.headers.get("CF-Cache-Status");
        if (etag) {
          if (ifNoneMatch && ifNoneMatch === etag && proxyCacheStatus === "MISS") {
            response.headers.set("CF-Cache-Status", "EXPIRED");
          } else {
            response.headers.set("CF-Cache-Status", "REVALIDATED");
          }
          response.headers.set("etag", formatETag(etag, "weak"));
        }
      }
      if (shouldSetBrowserCache) {
        response.headers.set("Cache-Control", `max-age=${options.cacheControl.browserTTL}`);
      } else {
        response.headers.delete("Cache-Control");
      }
      return response;
    }, "getAssetFromKV");
    exports.getAssetFromKV = getAssetFromKV2;
  }
});

// .wrangler/tmp/bundle-DCTOiV/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/bundle-DCTOiV/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();

// backend/worker.js
init_checked_fetch();
init_modules_watch_stub();
var import_kv_asset_handler = __toESM(require_dist());

// backend/utils/parseStems.js
init_checked_fetch();
init_modules_watch_stub();
var parseStems = /* @__PURE__ */ __name(async (r2Bucket) => {
  const list = await r2Bucket.list();
  const files = list.objects.map((object) => object.key);
  const songs = {};
  files.forEach((file) => {
    const decodedFile = decodeURIComponent(file);
    const ext = decodedFile.split(".").pop().toLowerCase();
    if (ext !== "wav" && ext !== "m4a" && ext !== "mp3")
      return;
    const [songName, bpm, stemName***REMOVED*** = decodedFile.split("/").pop().split("_");
    if (!songs[songName***REMOVED***) {
      songs[songName***REMOVED*** = {
        name: songName,
        bpm: parseInt(bpm, 10),
        key: "Unknown",
        // Placeholder; you can customize this logic later
        stems: [***REMOVED***
      };
    }
    songs[songName***REMOVED***.stems.push({
      stemName,
      filePath: file,
      // Use the full path from R2
      stemGroup: "Track",
      // Default group
      assigned_to: null,
      // Default assigned_to
      volume: 1
      // Default volume
    });
  });
  return Object.values(songs);
}, "parseStems");
var parseStems_default = parseStems;

// backend/worker.js
var worker_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api")) {
      return handleApiRequest(request, env);
    }
    try {
      return await (0, import_kv_asset_handler.getAssetFromKV)(ctx, request);
    } catch (e) {
      console.error("Error fetching asset:", e);
      return new Response("Not found", { status: 404 });
    }
  }
};
async function handleApiRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api", "");
  if (path === "/songs") {
    return handleSongsRequest(env);
  }
  if (path === "/members") {
    return handleMembersRequest(env);
  }
  if (path.startsWith("/stems/")) {
    return handleStemsProxyRequest(path.replace("/stems/", ""), env);
  }
  if (path === "/process-stems") {
    return handleProcessStemsRequest(env);
  }
  if (path === "/list") {
    return handleListObjectsRequest(env);
  }
  if (path === "/r2-base-url") {
    return handleR2BaseUrlRequest(env);
  }
  if (path === "/debug") {
    return handleDebugRequest(env);
  }
  return new Response("Not found", { status: 404 });
}
__name(handleApiRequest, "handleApiRequest");
async function handleR2BaseUrlRequest(env) {
  const baseUrl = `https://${env.ACCOUNT_ID}.r2.cloudflarestorage.com/${env.BUCKET_NAME}`;
  return new Response(JSON.stringify({ r2BaseUrl: baseUrl }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
__name(handleR2BaseUrlRequest, "handleR2BaseUrlRequest");
async function handleSongsRequest(env) {
  try {
    const { results } = await env.DB.prepare("SELECT * FROM songs").all();
    const songsWithStems = await Promise.all(
      results.map(async (song) => {
        const stems = await env.DB.prepare("SELECT * FROM stems WHERE song_id = ?").bind(song.id).all();
        return { ...song, stems: stems.results || [***REMOVED*** };
      })
    );
    return new Response(JSON.stringify(songsWithStems), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
    return new Response("Error fetching songs", { status: 500 });
  }
}
__name(handleSongsRequest, "handleSongsRequest");
async function handleMembersRequest(env) {
  try {
    const { results } = await env.DB.prepare("SELECT * FROM band").all();
    return new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("Error fetching band members:", error);
    return new Response("Error fetching band members", { status: 500 });
  }
}
__name(handleMembersRequest, "handleMembersRequest");
async function handleProcessStemsRequest(env) {
  try {
    const songs = await parseStems_default(env.STEMS_BUCKET);
    for (const song of songs) {
      const { name, bpm, key, stems } = song;
      if (!name || !bpm || !key) {
        console.error("Invalid song data:", song);
        continue;
      }
      const existingSong = await env.DB.prepare("SELECT * FROM songs WHERE name = ? AND bpm = ?").bind(name, bpm).first();
      let songId;
      if (existingSong) {
        songId = existingSong.id;
      } else {
        const result = await env.DB.prepare("INSERT INTO songs (name, bpm, key) VALUES (?, ?, ?)").bind(name, bpm, key).run();
        songId = result.lastInsertRowid;
      }
      for (const stem of stems) {
        const { stemName, filePath, stemGroup, assigned_to, volume } = stem;
        if (!stemName || !filePath || !stemGroup || assigned_to === void 0 || volume === void 0) {
          console.error("Invalid stem data:", stem);
          continue;
        }
        const existingStem = await env.DB.prepare("SELECT * FROM stems WHERE song_id = ? AND stem_name = ?").bind(songId, stemName).first();
        if (!existingStem) {
          await env.DB.prepare("INSERT INTO stems (song_id, stem_name, file_path, stem_group, assigned_to, volume) VALUES (?, ?, ?, ?, ?, ?)").bind(songId, stemName, filePath, stemGroup, assigned_to, volume).run();
        }
      }
    }
    return new Response(JSON.stringify({ message: "Stems processed and added to the database successfully" }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("Error processing stems:", error);
    return new Response("Error processing stems", { status: 500 });
  }
}
__name(handleProcessStemsRequest, "handleProcessStemsRequest");
async function handleListObjectsRequest(env) {
  try {
    const list = await env.STEMS_BUCKET.list();
    const objects = list.objects.map((object) => ({
      key: object.key,
      size: object.size
    }));
    return new Response(JSON.stringify(objects), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("Error listing objects:", error);
    return new Response("Error listing objects", { status: 500 });
  }
}
__name(handleListObjectsRequest, "handleListObjectsRequest");
async function handleDebugRequest(env) {
  try {
    const songs = await env.DB.prepare("SELECT * FROM songs").all();
    const band = await env.DB.prepare("SELECT * FROM band").all();
    const stems = await env.DB.prepare("SELECT * FROM stems").all();
    return new Response(JSON.stringify({ songs, band, stems }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("Error fetching debug data:", error);
    return new Response(`Error fetching debug data: ${error.message}`, { status: 500 });
  }
}
__name(handleDebugRequest, "handleDebugRequest");
async function handleStemsProxyRequest(key, env) {
  try {
    const object = await env.STEMS_BUCKET.get(key);
    if (!object) {
      return new Response("File not found", { status: 404 });
    }
    return new Response(object.body, {
      headers: {
        "Content-Type": object.httpMetadata?.contentType || "application/octet-stream",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("Error reading R2 object:", error);
    return new Response("Error reading R2 object", { status: 500 });
  }
}
__name(handleStemsProxyRequest, "handleStemsProxyRequest");

// ../../../../opt/homebrew/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../opt/homebrew/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-DCTOiV/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
***REMOVED***;
var middleware_insertion_facade_default = worker_default;

// ../../../../opt/homebrew/lib/node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
var __facade_middleware__ = [***REMOVED***;
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail***REMOVED*** = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ***REMOVED***);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-DCTOiV/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
