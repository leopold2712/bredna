/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import './styles.scss';

export type NavItemProps = {
  title: string;
  itemId: string;
  // disabled?: boolean;
  elemBefore?: React.FC<unknown>;
  subNav?: NavItemProps[];
  gaEvent?: () => void;
  notifications?: number;
};

type SideNavProps = {
  items: NavItemProps[];
  activeItemId: string;
  onSelect?: ({ itemId }: { itemId: string }) => void;
  listOfSamePages?: string[] /* urls which based in one sidemenu section */;
};

const Navigation: React.FC<SideNavProps> = ({
  activeItemId,
  onSelect,
  items,
  listOfSamePages = [],
}: SideNavProps) => {
  const [activeSubNav, setActiveSubNav] = useState({
    expanded: true,
    selectedId: activeItemId,
  });

  useEffect(() => {
    setActiveSubNav({
      expanded: true,
      selectedId: activeItemId,
    });
  }, [activeItemId]);

  const handleClick = (itemId: string) => {
    // call the callback if supplied
    let item = items.find((item) => item.itemId === itemId);
    // try to search gaEvent in subnavs
    if (!item) {
      items.forEach((navItem) => {
        const subItem = navItem.subNav?.find((subNav) => subNav.itemId === itemId);
        if (subItem) {
          item = subItem;
        }
      });
    }
    if (item && item.gaEvent) item.gaEvent();
    onSelect?.({ itemId });
  };

  function handleSubNavExpand(item: NavItemProps): void {
    if (activeSubNav.expanded) {
      const currentItemOrSubNavItemIsOpen: boolean =
        // either the parent item is expanded already
        item.itemId === activeSubNav.selectedId ||
        // or one of its expandable children is selected
        (item.subNav &&
          item.subNav.some((_subNavItem) => _subNavItem.itemId === activeSubNav.selectedId)) ||
        false;

      setActiveSubNav({
        expanded: item.subNav && item.subNav.length > 0 ? !currentItemOrSubNavItemIsOpen : false, // disable expansion value, if not expandable
        selectedId: item.itemId,
      });
    } else {
      setActiveSubNav({
        expanded: !!(item.subNav && item.subNav.length > 0), // expand if expandable
        selectedId: item.itemId,
      });
    }
  }

  return (
    <>
      {items.length > 0 && (
        <nav role="navigation" aria-label="side-navigation" className="side-navigation-panel">
          {items.map((item: NavItemProps) => {
            const ElemBefore = item.elemBefore;
            const isItemSelected: boolean =
              item.itemId === activeSubNav.selectedId ||
              listOfSamePages?.includes(activeSubNav.selectedId);

            const isActiveTab: boolean =
              // item is expanded and
              activeSubNav.expanded &&
              // either the current expandable section is selected
              (isItemSelected ||
                // or some item in the expandable section of the current item is selected or active
                (item.subNav &&
                  item.subNav.some(
                    (_subNavItem: NavItemProps) => _subNavItem.itemId === activeSubNav.selectedId,
                  )) ||
                false);

            const className = classNames('side-navigation-panel-select-option-indicator', {
              'indicator--type-1':
                item.notifications && item.notifications > 0 && item.notifications < 10,
              'indicator--type-2': item.notifications && item.notifications >= 10,
            });

            return (
              <ul key={item.itemId} className="side-navigation-panel-select">
                <li className="side-navigation-panel-select-wrap">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={(): void => {
                      handleSubNavExpand(item);
                      handleClick(item.itemId);
                    }}
                    className={`side-navigation-panel-select-option ${
                      isItemSelected ? 'side-navigation-panel-select-option-selected' : ''
                    } ${
                      item.subNav && item.subNav.length > 0 && isActiveTab
                        ? 'side-navigation-panel-select-sub-menu-option-selected'
                        : ''
                    } `}
                  >
                    <span className="side-navigation-panel-select-option-wrap">
                      {/** Prefix Icon Component */}
                      {ElemBefore && <ElemBefore />}

                      <span className="side-navigation-panel-select-option-text">{item.title}</span>

                      {!!item.notifications && item.notifications > 0 && (
                        <span className={className}>{item.notifications}</span>
                      )}
                    </span>
                  </div>
                </li>

                {item.subNav && item.subNav.length > 0 && isActiveTab && (
                  <ul className="side-navigation-panel-select-inner">
                    {item.subNav.map((subNavItem: NavItemProps) => {
                      const SubItemElemBefore = subNavItem.elemBefore;

                      return (
                        <li
                          key={subNavItem.itemId}
                          className="side-navigation-panel-select-inner-wrap"
                        >
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={(): void => {
                              setActiveSubNav({
                                ...activeSubNav,
                                selectedId: subNavItem.itemId,
                              });
                              handleClick(subNavItem.itemId);
                            }}
                            className={`side-navigation-panel-select-inner-option ${
                              activeSubNav.selectedId === subNavItem.itemId
                                ? 'side-navigation-panel-select-inner-option-selected'
                                : ''
                            } `}
                          >
                            <span className="side-navigation-panel-select-inner-option-wrap">
                              {/** Prefix Icon Component */}
                              {SubItemElemBefore && <SubItemElemBefore />}

                              <span className="side-navigation-panel-select-inner-option-text">
                                {subNavItem.title}
                              </span>
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </ul>
            );
          })}
        </nav>
      )}
    </>
  );
};

export default Navigation;
