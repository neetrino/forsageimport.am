"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import type { Dictionary } from "@/lib/i18n/types";
import {
  getSiteContact,
  type SiteBranchId,
  type SiteContactBranch,
} from "@/lib/site/contact";
import { useIsMounted, useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

type CallForPriceDialogProps = {
  open: boolean;
  locationLabel: string;
  dict: Dictionary;
  onClose: () => void;
};

function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  const match = digits.match(/^\+374(\d{2})(\d{3})(\d{3})$/);
  if (!match) return phone;
  return `+374 ${match[1]} ${match[2]} ${match[3]}`;
}

function PhoneGlyph() {
  return (
    <svg
      className="calc-call-glyph"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M7.2 2.8h2.1c.6 0 1.1.4 1.2 1l.4 2.1c.1.5 0 1-.4 1.3l-1.3 1.1c1.1 2.1 2.8 3.8 4.9 4.9l1.1-1.3c.4-.4.8-.5 1.3-.4l2.1.4c.6.1 1 .6 1 1.2v2.1c0 .7-.6 1.3-1.3 1.2-3.7-.5-8.1-3.8-10.6-8.3C5.2 5.7 6 3.4 7.2 2.8Z"
      />
    </svg>
  );
}

function PinGlyph() {
  return (
    <svg
      className="calc-call-glyph"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 2.5c-3.6 0-6.5 2.9-6.5 6.5 0 4.6 5.4 10.7 5.9 11.2.3.3.8.3 1.1 0 .5-.5 6-6.6 6-11.2C18.5 5.4 15.6 2.5 12 2.5Zm0 8.8a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6Z"
      />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.4 6.4 17.6 17.6M17.6 6.4 6.4 17.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CallForPriceDialog({
  open,
  locationLabel,
  dict,
  onClose,
}: CallForPriceDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const mounted = useIsMounted();
  const reduceMotion = useSafeReducedMotion();
  const contact = useMemo(
    () => getSiteContact(dict.footer.addresses),
    [dict.footer.addresses],
  );
  const branches = contact.branches;
  const [branchId, setBranchId] = useState<SiteBranchId>(
    branches[0]?.id ?? "yerevan",
  );
  const copy = dict.calculator.callForPrice;
  const selectedBranch: SiteContactBranch | undefined =
    branches.find((branch) => branch.id === branchId) ?? branches[0];

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const overlayTransition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };
  const panelTransition = reduceMotion
    ? { duration: 0.01 }
    : { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.85 };

  return createPortal(
    <AnimatePresence>
      {open && selectedBranch ? (
        <motion.div
          key="calc-call-overlay"
          className="calc-call-overlay"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="calc-call-dialog"
            initial={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 28, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.98 }
            }
            transition={panelTransition}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="calc-call-dialog-head">
              <div className="calc-call-dialog-intro">
                <span className="calc-call-badge">
                  <PhoneGlyph />
                  {copy.eyebrow}
                </span>
                <h2 id={titleId} className="calc-call-title">
                  {copy.title}
                </h2>
              </div>
              <motion.button
                type="button"
                className="calc-call-close"
                onClick={onClose}
                aria-label={copy.close}
                whileTap={reduceMotion ? undefined : { scale: 0.92 }}
              >
                <CloseGlyph />
              </motion.button>
            </header>

            <p id={descriptionId} className="calc-call-copy">
              {copy.description.split("{location}").map((chunk, index, parts) =>
                index < parts.length - 1 ? (
                  <span key={`chunk-${chunk}-${index}`}>
                    {chunk}
                    <strong className="calc-call-location">{locationLabel}</strong>
                  </span>
                ) : (
                  <span key={`tail-${chunk}-${index}`}>{chunk}</span>
                ),
              )}
            </p>

            <LayoutGroup id="calc-call-branches">
              <div
                className="calc-call-branch-tabs"
                role="tablist"
                aria-label={copy.cityLabel}
              >
                {branches.map((branch) => {
                  const selected = branch.id === selectedBranch.id;
                  return (
                    <button
                      key={branch.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      className="calc-call-branch-tab"
                      data-active={selected}
                      onClick={() => setBranchId(branch.id)}
                    >
                      {selected && !reduceMotion ? (
                        <motion.span
                          layoutId="calc-call-branch-pill"
                          className="calc-call-branch-pill"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      ) : null}
                      {selected && reduceMotion ? (
                        <span className="calc-call-branch-pill" />
                      ) : null}
                      <span className="calc-call-branch-tab-label">
                        <PinGlyph />
                        {dict.footer.branches[branch.id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            <div className="calc-call-phones" role="tabpanel">
              <p className="calc-call-phones-label">{dict.footer.phoneLabel}</p>
              <AnimatePresence mode="wait">
                <motion.ul
                  key={selectedBranch.id}
                  className="calc-call-phone-list"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
                >
                  {selectedBranch.phones.map((phone, index) => (
                    <motion.li
                      key={phone}
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, x: -10 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={
                        reduceMotion
                          ? { duration: 0.01 }
                          : {
                              delay: 0.04 * index,
                              type: "spring",
                              stiffness: 360,
                              damping: 28,
                            }
                      }
                    >
                      <motion.a
                        className="calc-call-phone-link"
                        href={`tel:${phone}`}
                        whileHover={
                          reduceMotion ? undefined : { y: -1, scale: 1.01 }
                        }
                        whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                      >
                        <span className="calc-call-phone-main">
                          <span className="calc-call-phone-icon">
                            <PhoneGlyph />
                          </span>
                          <span>{formatPhoneDisplay(phone)}</span>
                        </span>
                        <span className="calc-call-phone-action">
                          {copy.callAction}
                        </span>
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>

            <motion.button
              type="button"
              className="calc-call-dismiss"
              onClick={onClose}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              {copy.close}
            </motion.button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
