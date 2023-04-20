// contracts/SaveTheBankers.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Taxable.sol";

contract SaveTheBankers is Taxable, ReentrancyGuard, ERC20Capped, ERC20Burnable, AccessControl {
    address payable owner;
    address payable burnwallet;
    bytes32 public constant GOVERNOR_ROLE = keccak256("GOVERNOR_ROLE");
    bytes32 public constant PRESIDENT_ROLE = keccak256("PRESIDENT_ROLE");
    bytes32 public constant EXCLUDER_ROLE = keccak256("EXCLUDER_ROLE"); 
    bytes32 public constant EXCLUDED_ROLE = keccak256("EXCLUDED_ROLE");

    constructor(uint256 totalSupply, address taxdestination_) 
        ERC20("Save The Bankers", "STB") 
        ERC20Capped(totalSupply * (10 ** decimals())) 
        Taxable(true, 500, 2000, 150, taxdestination_)
        {
            owner = payable(msg.sender);
            // burnwallet = payable(0xeB01b6B6963A5Dda5F3D7A9f707516bE3150A49a);
            burnwallet = payable(taxdestination_);
            _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
            _grantRole(GOVERNOR_ROLE, msg.sender);
            _grantRole(PRESIDENT_ROLE, msg.sender);
            _grantRole(EXCLUDER_ROLE, msg.sender);
            _grantRole(EXCLUDED_ROLE, msg.sender);
            _mint(owner, 8000000000 * (10 ** decimals()));
            _mint(burnwallet, 2000000000 * (10 ** decimals()));


        }

    
    event NewTx (
        uint indexed date,
        address indexed from,
        address indexed to,
        uint amount
    );

    function _mint(address account, uint256 amount) internal virtual override(ERC20Capped, ERC20) onlyOwner() {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

    function enableTax() public onlyRole(GOVERNOR_ROLE) onlyOwner() { _taxon(); }
    function disableTax() public onlyRole(GOVERNOR_ROLE) onlyOwner() { _taxoff(); }
    function updateTax(uint newtax) public onlyRole(GOVERNOR_ROLE) onlyOwner() { _updatetax(newtax); }
    function updateTaxDestination(address newdestination) public onlyRole(PRESIDENT_ROLE) onlyOwner() { _updatetaxdestination(newdestination); }
    function addExcludedAddress(address newexcluded) public onlyRole(EXCLUDER_ROLE) onlyOwner() { _grantRole(EXCLUDED_ROLE, newexcluded); }
    function removeExcludedAddress(address oldexcluded) public onlyRole(EXCLUDER_ROLE) onlyOwner() { _revokeRole(EXCLUDED_ROLE, oldexcluded); }

    function _transfer(
            address sender,
            address recipient,
            uint256 amount
        ) internal virtual override(ERC20) nonReentrant{
            if(hasRole(EXCLUDED_ROLE, sender) || hasRole(EXCLUDED_ROLE, recipient) || !taxed()) { 
                // If to/from a tax excluded address or if tax is off...
                super._transfer(sender, recipient, amount); // Transfers 100% of amount to recipient.
            } else { 
                // If not to/from a tax excluded address & tax is on...
                require(balanceOf(sender) >= amount, "ERC20: transfer amount exceeds balance"); // Makes sure sender has the required total amount.
                // If the above requirement is not met, then it is possible that the sender could pay the tax but not the recipient, which is bad...
                super._transfer(sender, taxdestination(), amount*thetax()/10000); // Transfers tax to the tax destination address.
                super._transfer(sender, recipient, amount*(10000-thetax())/10000); // Transfers the remainder to the recipient.
            }
        }


    
    function _beforeTokenTransfer(address from, address to, uint256 value) internal virtual override {
        emit NewTx(block.timestamp, msg.sender, to, value);
        super._beforeTokenTransfer(from, to, value);
    }

    function destroy() public onlyOwner {
        selfdestruct(owner);
    }

    modifier onlyOwner() {
        require (msg.sender == owner);
        _;
    }
}