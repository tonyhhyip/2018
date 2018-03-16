import 'babel-polyfill';
import $ from 'jquery';
import './https';
import './ga';
import './sw';
import '../scss/app.scss';
import './toc';
import './offline';
import './detect';
import './eggs';

$('.button-collapse').sideNav();
$('.collapsible').collapsible();
$('.collapsible a.collapsible-header').click((e) => { e.preventDefault(); });
$('.scrollspy').scrollSpy();

