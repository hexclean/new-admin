import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Test.css";

function Test() {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        if (response.data) {
          setUsers(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getHeroes = () => {
    const heroesList = [];
    users.map((user, index) =>
      heroesList.push(
        <h1 key={user.id}>
          {user.id} {user.productFinals[0].id}
        </h1>
      )
    );
    return heroesList;
  };

  return (
    <body
      class="page-default-menu-index"
      itemscope
      itemtype="http://schema.org/Restaurant"
    >
      <a name="page-top" id="page-top" class="anchor-link"></a>
      <header id="header">
        <div class="wrap">
          <a href="../../../index.html" class="logo" title="Főoldal">
            NetPincér.hu - Főoldal
          </a>
          <div id="hamburger-menu">
            <a href="javascript:void(0);" class="title login">
              <div>Belépés</div>
            </a>
            <div id="login-menu" class="hamburger-menu-container">
              <div class="arrow"></div>

              <input
                type="hidden"
                name="redir"
                value="/budapest_i/da_giovanni_pizzeria/hazhozszallitas/_etlap"
                id="redir"
              />
              <div class="padding">
                <div class="name clearfix">
                  <div class="icon">
                    <div class="arrow"></div>
                  </div>
                  <div class="input">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value=""
                      placeholder="Azonosító / Email"
                    />
                  </div>
                </div>
                <div class="password clearfix">
                  <div class="icon">
                    <div class="arrow"></div>
                  </div>
                  <div class="input">
                    <div class="input-extra">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value=""
                        autocomplete="off"
                        placeholder="Jelszó"
                      />
                      <div class="trigger">
                        <a
                          href="../../../jelszo-megvaltoztatasa.html"
                          title="Segítség, nem tudok bejelentkezni!"
                        >
                          Elfelejtettem
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="submit">
                  <input
                    type="submit"
                    name="login"
                    id="login"
                    value="Belépés"
                  />
                </div>
                <div id="logInWithFacebookSeparator" class="separator line">
                  <span>vagy</span>
                </div>
                <div id="logInWithFacebookWrapper" class="facebook">
                  <a href="javascript:void(0);" id="logInWithFacebook">
                    Belépés Facebookkal
                  </a>
                  <div id="connectFacebookLoginErrorMessages">
                    Hiba történt! Kérjük, próbáld újra!
                  </div>
                </div>
              </div>
              <div class="remember-me">
                <input type="hidden" name="rememberMe" value="0" />
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  value="1"
                />
                <label for="rememberMe">Belépve maradok</label>
              </div>
            </div>
          </div>
          <a
            href="../../../regisztracio.html"
            title="Regisztráció"
            class="signup"
          >
            Regisztráció
          </a>
        </div>
      </header>
      <div class="sub-header">
        <div class="wrap">
          <nav id="nav" class="clearfix" data-address-label="Rendelés ide:">
            <div class="breadcrumb">
              <ul>
                <li class="home">
                  <a href="../../../index.html" title="Főoldal"></a>
                </li>
                <li class="arrow"></li>
                <li>
                  <a
                    title="Budapest - I."
                    href="https://www.netpincer.hu/hazhozszallitas/cim-valasztas"
                    onclick="javascript:_gaq.push(['_trackEvent', 'navbar', 'Budapest - I.']);"
                  >
                    Budapest - I.
                  </a>
                </li>
                <li class="arrow"></li>
                <li>
                  <a
                    title="Étteremlista"
                    href="https://www.netpincer.hu/budapest_i/hazhozszallitas"
                    onclick="javascript:_gaq.push(['_trackEvent', 'navbar', 'Étteremlista']);"
                  >
                    Étteremlista
                  </a>
                </li>
                <li class="arrow"></li>
                <li>
                  <b>Étlap</b>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div id="overlay"></div>
      <div id="content">
        <div class="wrap col-3-1 clearfix">
          <div class="left-side">
            <div class="hero-header">
              <div class="shadow">
                <div class="logo">
                  <img
                    itemprop="image"
                    src="https://images.deliveryhero.io/image/netpincer/caterer/sh-260a1a03-eb48-61f4-bb2e-bb731b43de6e/logo.png?width=200&amp;height=200"
                    alt="Da Giovanni Pizzéria"
                  />
                </div>
                <div class="info">
                  <h1 itemprop="name">Da Giovanni Pizzéria</h1>
                  <div
                    class="address"
                    itemprop="address"
                    itemscope
                    itemtype="http://schema.org/PostalAddress"
                  >
                    1110 Budapest - XI. Karinthy Frigyes út 22.
                    <meta itemprop="postalCode" content="1110" />
                    <meta itemprop="addressLocality" content="Budapest - XI." />
                    <meta
                      itemprop="streetAddress"
                      content="Karinthy Frigyes út 22."
                    />
                  </div>
                  <div class="open" itemprop="openingHours">
                    Nyitva tartás: 10:00 - 21:55
                  </div>
                </div>
                <meta itemprop="servesCuisine" content="pizza, olasz" />
                <meta itemprop="telephone" content="+3616146292" />
                <div
                  class="rate green"
                  itemprop="aggregateRating"
                  itemscope
                  itemtype="http://schema.org/AggregateRating"
                >
                  <meta itemprop="ratingCount" content="92" />
                  <meta itemprop="ratingValue" content="96" />
                  <meta itemprop="bestRating" content="100" />
                  <meta itemprop="worstRating" content="0" />
                  <b>9.6</b>
                  <span>92 értékelés</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right-side"></div>
        </div>
        <div class="wrap col-3-1 clearfix">
          <div class="left-side menu-left-side">
            <div class="tabs fixed clearfix">
              <div class="clearfix">
                <a
                  href="javascript:void(0);"
                  data-content="menu"
                  class="selected"
                >
                  Étlap
                </a>
                <a href="javascript:void(0);" data-content="info">
                  Infók & Akciók
                </a>
                <a href="javascript:void(0);" data-content="review">
                  Értékelés
                </a>
              </div>
              <div class="mask"></div>
            </div>
            <div class="menu-container main-content clearfix">
              <div class="filter-list">
                <div class="tools">
                  <div id="filter-tag-container">
                    <div class="filter-box" id="">
                      <div class="padding">
                        <div class="title">Aktuális szűrések</div>
                        <div class="tags"></div>
                        <a
                          href="javascript:void(0);"
                          id="clear-filter"
                          class="more"
                        >
                          Összes szűrés törlése
                        </a>
                      </div>
                    </div>
                    <br />
                  </div>
                  <div class="filter-box menu-search-box">
                    <div id="search">
                      <div class="input">
                        <div class="input-extra">
                          <input
                            type="text"
                            id="menu-search"
                            placeholder="Étel keresés"
                          />
                          <div class="trigger">
                            <a
                              href="javascript:void(0);"
                              id="menu-search-clear"
                            >
                              Törlés
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div class="filter-box">
                    <div class="padding">
                      <div class="title">Hasznos</div>
                    </div>
                    <ul class="filter-personal">
                      <li>
                        <a
                          id="popular-filter"
                          href="https://www.netpincer.hu/hazhozszallitas/budapest_i/da_giovanni_pizzeria/etlap/popular/1"
                        >
                          népszerű ételek
                        </a>
                      </li>
                      <li>
                        <a
                          id="price-filter"
                          data-name="1500 Ft alatt"
                          data-limit="1500"
                          href="javascript:void(0);"
                          onclick="_gaq.push(['_trackEvent', 'NP_UX_Revision', 'menu - 1500ft alatt filter']);"
                        >
                          1500 Ft alatt
                        </a>
                      </li>
                    </ul>
                  </div>
                  <br />
                  <div class="filter-box assortment">
                    <div class="padding">
                      <div class="title">Választék</div>
                    </div>
                    <ul class="filter-assortment">
                      <li class="selected">
                        <a id="all-category" href="_etlap.html">
                          Teljes választék
                        </a>
                      </li>
                      <li>
                        <a
                          class="clearfix"
                          data-name="Kategória"
                          data-public-id="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                          title="Tejszínes, tejfölös alapú pizzák (32cm)"
                          href="https://www.netpincer.hu/hazhozszallitas/budapest_i/da_giovanni_pizzeria/etlap/category/mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                        >
                          Tejszínes, tejfölös alapú pizzák (32cm)
                        </a>
                      </li>
                      <li>
                        <a
                          class="clearfix"
                          data-name="Kategória"
                          data-public-id="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                          title="Húsos pizzák (32cm)"
                          href="https://www.netpincer.hu/hazhozszallitas/budapest_i/da_giovanni_pizzeria/etlap/category/mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                        >
                          Húsos pizzák (32cm)
                        </a>
                      </li>
                      <li>
                        <a
                          class="clearfix"
                          data-name="Kategória"
                          data-public-id="mc-092977ff-f031-40de-6dff-2d4c3b6567e5"
                          title="Halas pizzák (32cm)"
                          href="https://www.netpincer.hu/hazhozszallitas/budapest_i/da_giovanni_pizzeria/etlap/category/mc-092977ff-f031-40de-6dff-2d4c3b6567e5"
                        >
                          Halas pizzák (32cm)
                        </a>
                      </li>
                      <li>
                        <a
                          class="clearfix"
                          data-name="Kategória"
                          data-public-id="mc-488688c5-a51d-a603-020c-001aa30ebda7"
                          title="Vegetáriánus pizzák (32cm)"
                          href="https://www.netpincer.hu/hazhozszallitas/budapest_i/da_giovanni_pizzeria/etlap/category/mc-488688c5-a51d-a603-020c-001aa30ebda7"
                        >
                          Vegetáriánus pizzák (32cm)
                        </a>
                      </li>
                      <li>
                        <a
                          class="clearfix"
                          data-name="Kategória"
                          data-public-id="mc-53f7fc13-9dea-7154-daa7-9b3abdcdb1cd"
                          title="Bivalymozzarella sajttal készült pizza (32cm)"
                          href="https://www.netpincer.hu/hazhozszallitas/budapest_i/da_giovanni_pizzeria/etlap/category/mc-53f7fc13-9dea-7154-daa7-9b3abdcdb1cd"
                        >
                          Bivalymozzarella sajttal készült pizza (32cm)
                        </a>
                      </li>
                      <li>
                        <a
                          class="clearfix"
                          data-name="Kategória"
                          data-public-id="mc-81b52034-e516-c89b-49e2-a2678f0d69c7"
                          title="Csukott pizzák (32cm)"
                          href="https://www.netpincer.hu/hazhozszallitas/budapest_i/da_giovanni_pizzeria/etlap/category/mc-81b52034-e516-c89b-49e2-a2678f0d69c7"
                        >
                          Csukott pizzák (32cm)
                        </a>
                      </li>
                      <li>
                        <a
                          class="clearfix"
                          data-name="Kategória"
                          data-public-id="mc-b53ef57d-a5f8-081d-59dd-59e0062992c1"
                          title="Újdonság pizzák (32cm)"
                          href="https://www.netpincer.hu/hazhozszallitas/budapest_i/da_giovanni_pizzeria/etlap/category/mc-b53ef57d-a5f8-081d-59dd-59e0062992c1"
                        >
                          Újdonság pizzák (32cm)
                        </a>
                      </li>
                      <li>
                        <a
                          class="clearfix"
                          data-name="Kategória"
                          data-public-id="mc-f5173c7a-bb9e-5b57-aa36-78d961db675f"
                          title="Saláták"
                          href="https://www.netpincer.hu/hazhozszallitas/budapest_i/da_giovanni_pizzeria/etlap/category/mc-f5173c7a-bb9e-5b57-aa36-78d961db675f"
                        >
                          Saláták
                        </a>
                      </li>
                      <li>
                        <a
                          class="clearfix"
                          data-name="Kategória"
                          data-public-id="mc-8c289887-d604-6e5a-69c2-b79612a5b39a"
                          title="Üdítők"
                          href="https://www.netpincer.hu/hazhozszallitas/budapest_i/da_giovanni_pizzeria/etlap/category/mc-8c289887-d604-6e5a-69c2-b79612a5b39a"
                        >
                          Üdítők
                        </a>
                      </li>
                      <li>
                        <a
                          class="clearfix"
                          data-name="Kategória"
                          data-public-id="mc-5fb283f0-e70e-d7d6-2f35-7d020f363dc6"
                          title="Alkoholos italok"
                          href="https://www.netpincer.hu/hazhozszallitas/budapest_i/da_giovanni_pizzeria/etlap/category/mc-5fb283f0-e70e-d7d6-2f35-7d020f363dc6"
                        >
                          Alkoholos italok
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="back-to-top-height"></div>
                  <div id="back-to-top">
                    <a href="#page-top" class="anchor-link">
                      vissza a tetejére
                    </a>
                  </div>
                </div>
                <br class="tools-white-space" />
              </div>

              <div id="no-result">
                <h1>Nincs találat!</h1>
              </div>

              <div class="item-list">
                <input
                  id="shop-id"
                  type="hidden"
                  value="sh-260a1a03-eb48-61f4-bb2e-bb731b43de6e"
                />
                <div
                  class="category-header"
                  data-public-id="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                  data-item-category="Tejszínes, tejfölös alapú pizzák (32cm)"
                  data-has-ordered="0"
                  data-all-ordered="0"
                  data-has-popular="0"
                  data-has-recommended="0"
                  id="ch-mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                >
                  <h2>Tejszínes, tejfölös alapú pizzák (32cm)</h2>
                </div>
                <div
                  class="category-content"
                  data-public-id="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                  data-item-category="Tejszínes, tejfölös alapú pizzák (32cm)"
                  data-has-ordered="0"
                  data-all-ordered="0"
                  data-has-popular="0"
                  data-has-recommended="0"
                  id="cc-mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                >
                  <div
                    class="item"
                    data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-64c008de-207b-3144-1ec2-d451486d5da3/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="1910"
                    data-after-discount="1910"
                    data-tag=""
                    id="item_im-64c008de-207b-3144-1ec2-d451486d5da3"
                  >
                    <a name="im-64c008de-207b-3144-1ec2-d451486d5da3"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                      data-item-publicid="im-64c008de-207b-3144-1ec2-d451486d5da3"
                      data-item-name="Carbonara pizza (32cm)"
                      data-item-price="1910"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-64c008de-207b-3144-1ec2-d451486d5da3/city/10000001"
                      title="Kiválasztom"
                      id="add_im-64c008de-207b-3144-1ec2-d451486d5da3"
                    >
                      <div class="info">
                        <div class="name">Carbonara pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            fehér alap, bacon, tojássárgája, parmezán sajt
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 1 910,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-5d7bbb63-3569-46b7-b955-435b4711539b/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="1910"
                    data-after-discount="1910"
                    data-tag=""
                    id="item_im-5d7bbb63-3569-46b7-b955-435b4711539b"
                  >
                    <a name="im-5d7bbb63-3569-46b7-b955-435b4711539b"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                      data-item-publicid="im-5d7bbb63-3569-46b7-b955-435b4711539b"
                      data-item-name="Füstös pizza (32cm)"
                      data-item-price="1910"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-5d7bbb63-3569-46b7-b955-435b4711539b/city/10000001"
                      title="Kiválasztom"
                      id="add_im-5d7bbb63-3569-46b7-b955-435b4711539b"
                    >
                      <div class="info">
                        <div class="name">Füstös pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            fehér alap, mozzarella sajt, füstölt tarja, füstölt
                            sajt, lila hagyma
                          </span>
                        </div>
                        <div class="rate green">
                          <b>8.6</b> <span>7 vélemény</span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 1 910,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-670205a7-e7e2-add0-1e62-60c5d1cda293/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="1810"
                    data-after-discount="1810"
                    data-tag=""
                    id="item_im-670205a7-e7e2-add0-1e62-60c5d1cda293"
                  >
                    <a name="im-670205a7-e7e2-add0-1e62-60c5d1cda293"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                      data-item-publicid="im-670205a7-e7e2-add0-1e62-60c5d1cda293"
                      data-item-name="Kékszem pizza (32cm)"
                      data-item-price="1810"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-670205a7-e7e2-add0-1e62-60c5d1cda293/city/10000001"
                      title="Kiválasztom"
                      id="add_im-670205a7-e7e2-add0-1e62-60c5d1cda293"
                    >
                      <div class="info">
                        <div class="name">Kékszem pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            fehér alap, mozzarella sajt, ananász, feta sajt,
                            olívabogyó
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 1 810,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-21fecd9e-2102-b8da-1786-bf3a5fd2763b/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="2400"
                    data-after-discount="2400"
                    data-tag=""
                    id="item_im-21fecd9e-2102-b8da-1786-bf3a5fd2763b"
                  >
                    <a name="im-21fecd9e-2102-b8da-1786-bf3a5fd2763b"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                      data-item-publicid="im-21fecd9e-2102-b8da-1786-bf3a5fd2763b"
                      data-item-name="Lazacos pizza (32cm)"
                      data-item-price="2400"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-21fecd9e-2102-b8da-1786-bf3a5fd2763b/city/10000001"
                      title="Kiválasztom"
                      id="add_im-21fecd9e-2102-b8da-1786-bf3a5fd2763b"
                    >
                      <div class="info">
                        <div class="name">Lazacos pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            fehér alap, mozzarella sajt, lazac, rukkola
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 2 400,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-6720f915-0892-4e97-4930-c81c8b659160/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="2010"
                    data-after-discount="2010"
                    data-tag=""
                    id="item_im-6720f915-0892-4e97-4930-c81c8b659160"
                  >
                    <a name="im-6720f915-0892-4e97-4930-c81c8b659160"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                      data-item-publicid="im-6720f915-0892-4e97-4930-c81c8b659160"
                      data-item-name="Pollo pizza (32cm)"
                      data-item-price="2010"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-6720f915-0892-4e97-4930-c81c8b659160/city/10000001"
                      title="Kiválasztom"
                      id="add_im-6720f915-0892-4e97-4930-c81c8b659160"
                    >
                      <div class="info">
                        <div class="name">Pollo pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            fehér alap, mozzarella sajt, csirkemellcsíkok,
                            kukorica
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 2 010,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-81caebe0-3d66-e870-25e8-6693e415d643/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="2400"
                    data-after-discount="2400"
                    data-tag=""
                    id="item_im-81caebe0-3d66-e870-25e8-6693e415d643"
                  >
                    <a name="im-81caebe0-3d66-e870-25e8-6693e415d643"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                      data-item-publicid="im-81caebe0-3d66-e870-25e8-6693e415d643"
                      data-item-name="Sebastian pizza (32cm)"
                      data-item-price="2400"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-81caebe0-3d66-e870-25e8-6693e415d643/city/10000001"
                      title="Kiválasztom"
                      id="add_im-81caebe0-3d66-e870-25e8-6693e415d643"
                    >
                      <div class="info">
                        <div class="name">Sebastian pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            fehér alap, mozzarella sajt, fokhagymás koktélrák,
                            cukkini
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 2 400,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-50710abe-10e5-9dc8-452f-3429608a1f1b/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="2010"
                    data-after-discount="2010"
                    data-tag=""
                    id="item_im-50710abe-10e5-9dc8-452f-3429608a1f1b"
                  >
                    <a name="im-50710abe-10e5-9dc8-452f-3429608a1f1b"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                      data-item-publicid="im-50710abe-10e5-9dc8-452f-3429608a1f1b"
                      data-item-name="Valtellina pizza (32cm)"
                      data-item-price="2010"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-50710abe-10e5-9dc8-452f-3429608a1f1b/city/10000001"
                      title="Kiválasztom"
                      id="add_im-50710abe-10e5-9dc8-452f-3429608a1f1b"
                    >
                      <div class="info">
                        <div class="name">Valtellina pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            fehér alap, mozzarella sajt, vargányagomba, bacon,
                            feta sajt
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 2 010,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-4d3545b9-c602-52bf-ce44-52f2ddac1bed/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="2010"
                    data-after-discount="2010"
                    data-tag=""
                    id="item_im-4d3545b9-c602-52bf-ce44-52f2ddac1bed"
                  >
                    <a name="im-4d3545b9-c602-52bf-ce44-52f2ddac1bed"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-b30908aa-afcb-38ed-b377-0923f348cc7d"
                      data-item-publicid="im-4d3545b9-c602-52bf-ce44-52f2ddac1bed"
                      data-item-name="Vámpírűző pizza (32cm)"
                      data-item-price="2010"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-4d3545b9-c602-52bf-ce44-52f2ddac1bed/city/10000001"
                      title="Kiválasztom"
                      id="add_im-4d3545b9-c602-52bf-ce44-52f2ddac1bed"
                    >
                      <div class="info">
                        <div class="name">Vámpírűző pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            fehér alap, fokhagyma, mozzarella sajt, füstölt
                            sajt, csípős szalámi, lila hagyma, parmezán sajt
                          </span>
                        </div>
                        <div class="rate green">
                          <b>10.0</b> <span>4 vélemény</span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 2 010,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  class="category-header"
                  data-public-id="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                  data-item-category="Húsos pizzák (32cm)"
                  data-has-ordered="0"
                  data-all-ordered="0"
                  data-has-popular="0"
                  data-has-recommended="0"
                  id="ch-mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                >
                  <h2>Húsos pizzák (32cm)</h2>
                </div>
                <div
                  class="category-content"
                  data-public-id="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                  data-item-category="Húsos pizzák (32cm)"
                  data-has-ordered="0"
                  data-all-ordered="0"
                  data-has-popular="0"
                  data-has-recommended="0"
                  id="cc-mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                >
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-022fd2b5-fc89-a9ca-d0ca-6423638a8135/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="2060"
                    data-after-discount="2060"
                    data-tag=""
                    id="item_im-022fd2b5-fc89-a9ca-d0ca-6423638a8135"
                  >
                    <a name="im-022fd2b5-fc89-a9ca-d0ca-6423638a8135"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-022fd2b5-fc89-a9ca-d0ca-6423638a8135"
                      data-item-name="Boscaiola pizza (32cm)"
                      data-item-price="2060"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-022fd2b5-fc89-a9ca-d0ca-6423638a8135/city/10000001"
                      title="Kiválasztom"
                      id="add_im-022fd2b5-fc89-a9ca-d0ca-6423638a8135"
                    >
                      <div class="info">
                        <div class="name">Boscaiola pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, vargányagomba,
                            gorgonzola sajt, bacon
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 2 060,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-0d86b093-f140-e89c-e778-dd79eb80a9bc/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="2010"
                    data-after-discount="2010"
                    data-tag=""
                    id="item_im-0d86b093-f140-e89c-e778-dd79eb80a9bc"
                  >
                    <a name="im-0d86b093-f140-e89c-e778-dd79eb80a9bc"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-0d86b093-f140-e89c-e778-dd79eb80a9bc"
                      data-item-name="Britannia pizza (32cm)"
                      data-item-price="2010"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-0d86b093-f140-e89c-e778-dd79eb80a9bc/city/10000001"
                      title="Kiválasztom"
                      id="add_im-0d86b093-f140-e89c-e778-dd79eb80a9bc"
                    >
                      <div class="info">
                        <div class="name">Britannia pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, bacon, kukorica,
                            spárga, füstölt sajt
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 2 010,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-dd7b7df2-04d1-b9d0-97a3-0dfc3016af1e/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="1750"
                    data-after-discount="1750"
                    data-tag=""
                    id="item_im-dd7b7df2-04d1-b9d0-97a3-0dfc3016af1e"
                  >
                    <a name="im-dd7b7df2-04d1-b9d0-97a3-0dfc3016af1e"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-dd7b7df2-04d1-b9d0-97a3-0dfc3016af1e"
                      data-item-name="Capriciosa pizza (32cm)"
                      data-item-price="1750"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-dd7b7df2-04d1-b9d0-97a3-0dfc3016af1e/city/10000001"
                      title="Kiválasztom"
                      id="add_im-dd7b7df2-04d1-b9d0-97a3-0dfc3016af1e"
                    >
                      <div class="info">
                        <div class="name">Capriciosa pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, főtt sonka,
                            articsóka
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 1 750,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-4fb16188-7283-c819-b46c-4d1b6ff07a79/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="1800"
                    data-after-discount="1800"
                    data-tag=""
                    id="item_im-4fb16188-7283-c819-b46c-4d1b6ff07a79"
                  >
                    <a name="im-4fb16188-7283-c819-b46c-4d1b6ff07a79"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-4fb16188-7283-c819-b46c-4d1b6ff07a79"
                      data-item-name="Diavola pizza (32cm)"
                      data-item-price="1800"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-4fb16188-7283-c819-b46c-4d1b6ff07a79/city/10000001"
                      title="Kiválasztom"
                      id="add_im-4fb16188-7283-c819-b46c-4d1b6ff07a79"
                    >
                      <div class="info">
                        <div class="name">Diavola pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, csípős szalámi
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 1 800,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-0a01acf4-1617-b90b-5c25-d8f8116d3532/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="1750"
                    data-after-discount="1750"
                    data-tag=""
                    id="item_im-0a01acf4-1617-b90b-5c25-d8f8116d3532"
                  >
                    <a name="im-0a01acf4-1617-b90b-5c25-d8f8116d3532"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-0a01acf4-1617-b90b-5c25-d8f8116d3532"
                      data-item-name="Hawaii pizza (32cm)"
                      data-item-price="1750"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-0a01acf4-1617-b90b-5c25-d8f8116d3532/city/10000001"
                      title="Kiválasztom"
                      id="add_im-0a01acf4-1617-b90b-5c25-d8f8116d3532"
                    >
                      <div class="info">
                        <div class="name">Hawaii pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, főtt sonka,
                            ananász
                          </span>
                        </div>
                        <div class="rate green">
                          <b>10.0</b> <span>8 vélemény</span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 1 750,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-9858784c-0f7f-3c93-0227-a8efa4b3a1e2/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="1960"
                    data-after-discount="1960"
                    data-tag=""
                    id="item_im-9858784c-0f7f-3c93-0227-a8efa4b3a1e2"
                  >
                    <a name="im-9858784c-0f7f-3c93-0227-a8efa4b3a1e2"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-9858784c-0f7f-3c93-0227-a8efa4b3a1e2"
                      data-item-name="Lilli pizza (32cm)"
                      data-item-price="1960"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-9858784c-0f7f-3c93-0227-a8efa4b3a1e2/city/10000001"
                      title="Kiválasztom"
                      id="add_im-9858784c-0f7f-3c93-0227-a8efa4b3a1e2"
                    >
                      <div class="info">
                        <div class="name">Lilli pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, csípős szalámi,
                            gorgonzola sajt, lila hagyma
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 1 960,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-1fb29299-8b2f-8dd6-f691-a3a637623775/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="2010"
                    data-after-discount="2010"
                    data-tag=""
                    id="item_im-1fb29299-8b2f-8dd6-f691-a3a637623775"
                  >
                    <a name="im-1fb29299-8b2f-8dd6-f691-a3a637623775"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-1fb29299-8b2f-8dd6-f691-a3a637623775"
                      data-item-name="Magyaros pizza (32cm)"
                      data-item-price="2010"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-1fb29299-8b2f-8dd6-f691-a3a637623775/city/10000001"
                      title="Kiválasztom"
                      id="add_im-1fb29299-8b2f-8dd6-f691-a3a637623775"
                    >
                      <div class="info">
                        <div class="name">Magyaros pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, szalámi, bacon,
                            paprika, hagyma, friss paradicsom
                          </span>
                        </div>
                        <div class="rate green">
                          <b>10.0</b> <span>5 vélemény</span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 2 010,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-734334de-d5dc-f167-2a34-02c47009f0f2/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="1860"
                    data-after-discount="1860"
                    data-tag=""
                    id="item_im-734334de-d5dc-f167-2a34-02c47009f0f2"
                  >
                    <a name="im-734334de-d5dc-f167-2a34-02c47009f0f2"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-734334de-d5dc-f167-2a34-02c47009f0f2"
                      data-item-name="Piedone pizza (32cm)"
                      data-item-price="1860"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-734334de-d5dc-f167-2a34-02c47009f0f2/city/10000001"
                      title="Kiválasztom"
                      id="add_im-734334de-d5dc-f167-2a34-02c47009f0f2"
                    >
                      <div class="info">
                        <div class="name">Piedone pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, bacon, kukorica,
                            bab, lila hagyma
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 1 860,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-a53962a7-af61-d498-b4bc-807c6b427a21/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="1650"
                    data-after-discount="1650"
                    data-tag=""
                    id="item_im-a53962a7-af61-d498-b4bc-807c6b427a21"
                  >
                    <a name="im-a53962a7-af61-d498-b4bc-807c6b427a21"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-a53962a7-af61-d498-b4bc-807c6b427a21"
                      data-item-name="Prosciutto Funghi pizza (32cm)"
                      data-item-price="1650"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-a53962a7-af61-d498-b4bc-807c6b427a21/city/10000001"
                      title="Kiválasztom"
                      id="add_im-a53962a7-af61-d498-b4bc-807c6b427a21"
                    >
                      <div class="info">
                        <div class="name">Prosciutto Funghi pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, főtt sonka, gomba
                          </span>
                        </div>
                        <div class="rate green">
                          <b>10.0</b> <span>6 vélemény</span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 1 650,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-e37d0153-0314-55c3-110c-11547eef66d1/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="1460"
                    data-after-discount="1460"
                    data-tag=""
                    id="item_im-e37d0153-0314-55c3-110c-11547eef66d1"
                  >
                    <a name="im-e37d0153-0314-55c3-110c-11547eef66d1"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-e37d0153-0314-55c3-110c-11547eef66d1"
                      data-item-name="Prosciutto pizza (32cm)"
                      data-item-price="1460"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-e37d0153-0314-55c3-110c-11547eef66d1/city/10000001"
                      title="Kiválasztom"
                      id="add_im-e37d0153-0314-55c3-110c-11547eef66d1"
                    >
                      <div class="info">
                        <div class="name">Prosciutto pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, főtt sonka
                          </span>
                        </div>
                        <div class="rate green">
                          <b>10.0</b> <span>4 vélemény</span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 1 460,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-66ee6114-5307-6412-d8c3-969f64a6df62/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="1850"
                    data-after-discount="1850"
                    data-tag=""
                    id="item_im-66ee6114-5307-6412-d8c3-969f64a6df62"
                  >
                    <a name="im-66ee6114-5307-6412-d8c3-969f64a6df62"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-66ee6114-5307-6412-d8c3-969f64a6df62"
                      data-item-name="Quattro Stagioni pizza (32cm)"
                      data-item-price="1850"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-66ee6114-5307-6412-d8c3-969f64a6df62/city/10000001"
                      title="Kiválasztom"
                      id="add_im-66ee6114-5307-6412-d8c3-969f64a6df62"
                    >
                      <div class="info">
                        <div class="name">Quattro Stagioni pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, főtt sonka, gomba,
                            olívabogyó, articsóka
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 1 850,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-7142fde9-2a71-c090-fd85-68a0bc34fa1a/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="2150"
                    data-after-discount="2150"
                    data-tag=""
                    id="item_im-7142fde9-2a71-c090-fd85-68a0bc34fa1a"
                  >
                    <a name="im-7142fde9-2a71-c090-fd85-68a0bc34fa1a"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-7142fde9-2a71-c090-fd85-68a0bc34fa1a"
                      data-item-name="Roland pizza (32cm)"
                      data-item-price="2150"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-7142fde9-2a71-c090-fd85-68a0bc34fa1a/city/10000001"
                      title="Kiválasztom"
                      id="add_im-7142fde9-2a71-c090-fd85-68a0bc34fa1a"
                    >
                      <div class="info">
                        <div class="name">Roland pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, spárga, gorgonzola
                            sajt, crudo sonka
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 2 150,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-4685930d-2885-62ae-c8e2-4bb51305208e/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="1910"
                    data-after-discount="1910"
                    data-tag=""
                    id="item_im-4685930d-2885-62ae-c8e2-4bb51305208e"
                  >
                    <a name="im-4685930d-2885-62ae-c8e2-4bb51305208e"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-4685930d-2885-62ae-c8e2-4bb51305208e"
                      data-item-name="Sailor Moon pizza (32cm)"
                      data-item-price="1910"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-4685930d-2885-62ae-c8e2-4bb51305208e/city/10000001"
                      title="Kiválasztom"
                      id="add_im-4685930d-2885-62ae-c8e2-4bb51305208e"
                    >
                      <div class="info">
                        <div class="name">Sailor Moon pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, bacon, spenót,
                            gorgonzola sajt
                          </span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 1 910,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                  <div
                    class="item"
                    data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                    data-url="/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-c3c1c3e4-50f4-1e67-2278-c9cbb3efc082/city/10000001"
                    data-is-ordered="0"
                    data-is-popular="0"
                    data-is-recommended="0"
                    data-price="2150"
                    data-after-discount="2150"
                    data-tag=""
                    id="item_im-c3c1c3e4-50f4-1e67-2278-c9cbb3efc082"
                  >
                    <a name="im-c3c1c3e4-50f4-1e67-2278-c9cbb3efc082"></a>
                    <a
                      class="item-submit toppings clearfix"
                      data-category-publicid="mc-61a0c990-d4ee-3c76-5210-a5eabc7b89d2"
                      data-item-publicid="im-c3c1c3e4-50f4-1e67-2278-c9cbb3efc082"
                      data-item-name="San Daniele pizza (32cm)"
                      data-item-price="2150"
                      href="https://www.netpincer.hu/menu-hozzaad/ss-588c34ba-96c8-4ecb-4c77-5b6002f8a5c8/itemMapId/im-c3c1c3e4-50f4-1e67-2278-c9cbb3efc082/city/10000001"
                      title="Kiválasztom"
                      id="add_im-c3c1c3e4-50f4-1e67-2278-c9cbb3efc082"
                    >
                      <div class="info">
                        <div class="name">San Daniele pizza (32cm)</div>
                        <div class="description">
                          <span class="text">
                            paradicsomszósz, mozzarella sajt, crudo sonka,
                            rukkola
                          </span>
                        </div>
                        <div class="rate yellow">
                          <b>6.7</b> <span>3 vélemény</span>
                        </div>
                      </div>
                      <div class="button-container">
                        <div class="button">
                          <span> 2 150,00 Ft </span>
                        </div>
                        <div class="extra">extrák választhatók</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="address-container loading"
              data-city-error="Kérjük, add meg ezt az adatot is!"
              data-street-error="Kérjük, add meg ezt az adatot is!"
              data-street-number-error="Kérjük, add meg ezt az adatot is!"
            >
              <div class="clearfix">
                <h1 class="address-container-title">Cím frissítése</h1>
                <a href="javascript:void(0);" id="address-container-close">
                  Bezár
                </a>
              </div>
              <div class="content"></div>
            </div>
            <div class="info-container main-content clearfix">
              <div class="filter-list">
                <div class="filter-box last">
                  <div class="padding">
                    <ul class="info-list">
                      <li>
                        <div>Átlagos szállítási idő</div>
                        <b class=""> 40&nbsp;perc </b>
                      </li>
                      <li>
                        <div>Minimális rendelési érték</div>
                        <b>1 500 Ft</b>
                      </li>
                      <li>
                        <div>Cím</div>
                        <b>1110 Budapest - XI. Karinthy Frigyes út 22.</b>
                      </li>
                      <li>
                        <div>Netpincéren elérhető</div>
                        <b>Új</b>
                      </li>
                      <li>
                        <div>Konyha</div>
                        <b> pizza, olasz </b>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="info">
                <h2>Nyitva tartás</h2>
                <div class="opens">
                  <div class="open clearfix">
                    <div class="day">Hétfő</div>
                    <div class="hours">10:00 - 21:55</div>
                  </div>
                  <div class="open clearfix">
                    <div class="day">Kedd</div>
                    <div class="hours">10:00 - 21:55</div>
                  </div>
                  <div class="open clearfix">
                    <div class="day">Szerda</div>
                    <div class="hours">10:00 - 21:55</div>
                  </div>
                  <div class="open clearfix">
                    <div class="day">Csütörtök</div>
                    <div class="hours">10:00 - 21:55</div>
                  </div>
                  <div class="open today green clearfix">
                    <div class="day">
                      Péntek<span>most nyitva</span>
                    </div>
                    <div class="hours">10:00 - 21:55</div>
                  </div>
                  <div class="open clearfix">
                    <div class="day">Szombat</div>
                    <div class="hours">10:00 - 21:55</div>
                  </div>
                  <div class="open clearfix">
                    <div class="day">Vasárnap</div>
                    <div class="hours">10:00 - 21:55</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="review-container main-content clearfix">
              <div class="info">
                <h2>Hamarosan</h2>
              </div>
            </div>
          </div>

          <div class="right-side">
            <div class="basket">
              <div class="box">
                <div class="padding">
                  <div class="title main">Rendelésem</div>
                </div>
                <div class="items-animation"></div>
                <div class="items-animation"></div>
                <div class="padding">
                  <div class="empty">
                    <span
                      id="basket-empty-text"
                      data-address="Még üres a kosarad, válassz valami ízleteset!"
                    >
                      Még üres a kosarad, válassz valami ízleteset!
                    </span>
                  </div>
                  <a
                    title="Minimális rendelési érték: 0 Ft"
                    class="basket-submit disabled"
                    href="javascript:Menu.Alert('A rendelés nem érte el a minimális értéket: 0 Ft');"
                  >
                    Min: 0 Ft
                  </a>
                </div>
              </div>
            </div>
            <div class="basket-custom">
              <div id="dessert-button-container">
                <div class="button">
                  <span>Szeretnék desszertet is</span>
                </div>
              </div>
              <div id="algida-button-container">
                <div class="button">
                  <span>Algida poharas jégkrémek</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="toppings">
          <div class="header">
            Kiválasztott étel testreszabásaKöret, feltét választás
          </div>
          <div class="nav"></div>
          <div class="content"></div>
          <div class="button-container"></div>
        </div>
        <div id="photo">
          <div class="content"></div>
          <div class="nav clearfix">
            <div class="name"></div>
            <a href="javascript:void(0);" id="photo-close"></a>
          </div>
        </div>
      </div>

      <script
        type="text/javascript"
        src="https://www.netpincer.hu/skin/ultra/js/menu.min.js?v=1.0.7"
      ></script>
    </body>
  );
}

export default Test;
